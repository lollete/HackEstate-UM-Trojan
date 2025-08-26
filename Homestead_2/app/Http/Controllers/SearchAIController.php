<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use OpenAI\Factory;

class SearchAIController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        // Fetch properties from DB (limit for performance)
        $properties = Property::select('id', 'title', 'location', 'price', 'bedrooms', 'bathrooms', 'status')
            ->limit(50) // you can adjust or paginate
            ->get()
            ->toArray();

        $client = (new Factory())
            ->withApiKey(env('OPENAI_API_KEY'))
            ->make();

        $result = $client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a real estate assistant. Match user queries with property data. Return only relevant properties.'],
                ['role' => 'user', 'content' => "User search: {$query}\n\nHere are the available properties:\n" . json_encode($properties)],
            ],
        ]);

        return response()->json([
            'answer' => $result->choices[0]->message->content,
        ]);
    }
}
