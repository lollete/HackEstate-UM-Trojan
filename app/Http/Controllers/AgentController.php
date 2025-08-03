<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgentController extends Controller
{
    public function show($id)
    {
        $agent = User::findOrFail($id);

        $agentProfile = [
            'id' => $agent->id,
            'name' => $agent->name,
            'feedbackCount' => 12, // Replace with real feedback logic if needed
            'rating' => 4.5,       // Example rating
            'description' => $agent->description ?? 'This agent has not provided a description yet.',
            'location' => $agent->address ?? 'Unknown Location',
            'email' => $agent->email,
            'avatar' => $agent->avatar ?? 'https://placehold.co/200x200?text=No+Image',
            'banner' => $agent->banner ?? 'https://placehold.co/800x200?text=Banner',
            'isVerifiedAgent' => $agent->is_verified ?? false,
            'agentSince' => $agent->created_at->format('Y'),
        ];

        return Inertia::render('agent/AgentProfile', [
            'agent' => $agentProfile
        ]);
    }
}
