<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{


    public function ProfileAgent($id)
    {
        $user = User::with(['properties', 'feedbacks'])->findOrFail($id);

        return Inertia::render('agent/AgentProfile', [
            'agent' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'location' => $user->location ?? 'Unknown Location',
                'description' => $user->description ?? 'No description provided.',
                'avatar' => $user->avatar ?? 'https://via.placeholder.com/128',
                'banner' => $user->banner ?? 'https://via.placeholder.com/800x200',
                'feedbackCount' => $user->feedbacks->count(),
                'rating' => $user->feedbacks->avg('rating') ?? 0,
                'isVerifiedAgent' => (bool) $user->is_verified, // boolean
                'agentSince' => $user->created_at->year,
                'properties' => $user->properties->map(function ($property) {
                    return [
                        'id' => $property->id,
                        'name' => $property->title,
                        'location' => "{$property->address}, {$property->city}, {$property->province}, {$property->zipcode}",
                        'size' => $property->floor_area ?? 0,
                        'bedrooms' => $property->bedrooms,
                        'bathrooms' => $property->bathrooms,
                        'price' => $property->price,
                        'image' => $property->image ?? 'https://via.placeholder.com/400x300',
                        'forSale' => $property->status === 'available',
                        'forRent' => $property->status === 'rented',
                    ];
                }),
                'feedbacks' => $user->feedbacks->map(function ($feedback) {
                    return [
                        'id' => $feedback->id,
                        'comment' => $feedback->comment,
                        'rating' => $feedback->rating,
                    ];
                }),
            ],
        ]);
    }

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
