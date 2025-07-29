<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User; // ✅ This line is required

class ClientController extends Controller
{
    public function ListingView()
    {
        return Inertia::render('properties/listingView');
    }
    public function BookmarkView()
    {
        return Inertia::render('bookmark/bookmarkProperty');
    }
    public function ProfileAgent($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('agent/AgentProfile', [
            'agent' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'location' => $user->location ?? 'Unknown Location',
                'description' => $user->description ?? 'No description provided.',
                'avatar' => $user->avatar ?? 'https://via.placeholder.com/128',
                
                'banner' => $user->banner ?? 'https://via.placeholder.com/800x200',
                'feedbackCount' => $user->feedback_count ?? 0,
                'rating' => $user->rating ?? 0,
                'isVerifiedAgent' => $user->is_verified ?? false,
                'agentSince' => $user->created_at->year,
            ],
        ]);
    }
}
