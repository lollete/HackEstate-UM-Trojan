<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Return all properties as JSON for cards or map.
     */
    public function index()
    {
        $properties = Property::with('user')->get();

        $mapped = $properties->map(function ($property) {
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
                'agent' => [
                    'name' => $property->user->name ?? 'Unknown Agent',
                    'avatar' => $property->user->avatar ?? 'https://via.placeholder.com/100',
                ],
            ];
        });

        return response()->json($mapped);
    }

    /**
     * Show a single property by ID using Inertia (e.g., when clicking a card).
     */
    public function show($id)
    {
        $property = Property::with('user')->findOrFail($id);

        $mapped = [
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
            'agent' => [
                'name' => $property->user->name ?? 'Unknown Agent',
                'avatar' => $property->user->avatar ?? 'https://via.placeholder.com/100',
            ],
        ];

        return Inertia::render('properties/listingView', [
            'property' => $mapped,
        ]);
    }
}
