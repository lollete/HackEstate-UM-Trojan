<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $chats = Chat::with([
            'agent',
            'property',
            'messages' => function ($query) {
                $query->latest()->limit(100);
            }
        ])
            ->where('user_id', $userId)
            ->orWhere('agent_id', $userId)
            ->get()
            ->map(function ($chat) use ($userId) {
                return [
                    'id' => $chat->id,
                    'agent' => [
                        'id' => $chat->agent->id,
                        'name' => $chat->agent->name,
                        'avatar' => $chat->agent->avatar ?? 'https://placehold.co/40x40/CCCCCC/333333?text=' . substr($chat->agent->name, 0, 2)
                    ],
                    'property' => $chat->property ? [
                        'id' => $chat->property->id,
                        'title' => $chat->property->title,
                        'image' => $chat->property->images->first() ?? '',
                        'location' => "{$chat->property->address}, {$chat->property->city}"
                    ] : null,
                    'messages' => $chat->messages->map(function ($message) use ($userId) {
                        return [
                            'id' => $message->id,
                            'text' => $message->content,
                            'sender' => $message->sender_id == $userId ? 'user' : 'agent',
                            'timestamp' => $message->created_at->toIso8601String()
                        ];
                    })->sortBy('created_at')->values()->toArray()
                ];
            });

        return Inertia::render('Chat/Index', [
            'initialChats' => $chats
        ]);
    }

public function chatWithAgent($agentId)
{
    $agent = User::findOrFail($agentId); // Or Agent::findOrFail($agentId);
    
    return Inertia::render('agent/viewChat', [
        'agent' => [
            'id' => $agent->id,
            'name' => $agent->name,
            'avatar' => $agent->avatar ?? 'https://via.placeholder.com/100',
        ]
    ]);
}

    public function show($agentId)
    {
        $agent = User::findOrFail($agentId);

        return Inertia::render('Chat/Index', [
            'initialAgent' => [
                'id' => $agent->id,
                'name' => $agent->name,
                'avatar' => $agent->avatar ?? 'https://placehold.co/40x40/CCCCCC/333333?text=' . substr($agent->name, 0, 2)
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id'
        ]);

        $property = Property::findOrFail($request->property_id);
        $userId = Auth::id();

        $chat = Chat::firstOrCreate([
            'user_id' => $userId,
            'agent_id' => $property->user_id,
            'property_id' => $property->id
        ], [
            'user_id' => $userId,
            'agent_id' => $property->user_id,
            'property_id' => $property->id
        ]);

        return redirect()->route('chats.show', $chat->id);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'content' => 'required|string'
        ]);

        $message = Message::create([
            'chat_id' => $request->chat_id,
            'sender_id' => Auth::id(),
            'content' => $request->content()
        ]);

        // Broadcast the message if using websockets
        // broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'success' => true,
            'message' => $message->load('sender')
        ]);
    }

    public function indexData()
    {
        $userId = Auth::id();

        $chats = Chat::with(['agent', 'messages'])
            ->where('user_id', $userId)
            ->orWhere('agent_id', $userId)
            ->get()
            ->map(function ($chat) use ($userId) {
                return [
                    'id' => $chat->id,
                    'agent' => [
                        'id' => $chat->agent->id,
                        'name' => $chat->agent->name,
                        'avatar' => $chat->agent->avatar ?? 'https://via.placeholder.com/40x40',
                    ],
                    'messages' => $chat->messages->map(function ($msg) use ($userId) {
                        return [
                            'id' => $msg->id,
                            'text' => $msg->content,
                            'sender' => $msg->sender_id == $userId ? 'user' : 'agent',
                            'timestamp' => $msg->created_at->toIso8601String(),
                        ];
                    }),
                ];
            });

        return response()->json([
            'initialChats' => $chats
        ]);
    }

}