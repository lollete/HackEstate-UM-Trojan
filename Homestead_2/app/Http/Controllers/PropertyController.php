<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class PropertyController extends Controller
{
    /**
     * Return all properties as JSON for cards or map.
     */
    public function index()
    {
        $properties = Property::with('user')->get();

        $mapped = $properties->map(function ($property) {
            return $this->mapProperty($property);
        });

        return response()->json($mapped->values());
    }

    public function feature()
    {
        $properties = Property::with('user')->get();

        $mapped = $properties->map(function ($property) {
            return $this->mapProperty($property);
        });

        return response()->json($mapped);
    }

    public function show($id)
    {
        $property = Property::with('user')->findOrFail($id);

        $mapped = $this->mapProperty($property, true);

        return Inertia::render('properties/listingView', [
            'property' => $mapped,
        ]);
    }

    public function aiSearchTest(Request $request)
    {
        $query = $request->input('query', '3 bedroom apartment in Toronto');

        $filters = [
            'location' => 'Toronto',
            'bedrooms' => 3,
            'bathrooms' => 2,
            'maxPrice' => 500000,
            'forSale' => true,
            'forRent' => false
        ];

        return response()->json($filters);
    }

    /**
     * AI Search (POST)
     */
    public function aiSearch(Request $request)
    {
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

        $query = $request->input('query');

        if (!$query) {
            return response()->json(['error' => 'Query is required'], 400);
        }

        try {
            $filters = $this->fallbackSearch($query);

            // ✅ FIXED: call searchPropertiesDatabase not searchProperties
            $properties = $this->searchPropertiesDatabase($filters);

            return response()->json($properties);

        } catch (\Exception $e) {
            \Log::error('AI Search Error: ' . $e->getMessage());
            return $this->searchPropertiesDatabase(['location' => $query]);
        }
    }

    /**
     * AI Search (GET)
     */
    public function aiSearchGet(Request $request)
    {
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

        $query = $request->input('query', '');

        try {
            $filters = $this->fallbackSearch($query);

            // ✅ FIXED
            $properties = $this->searchPropertiesDatabase($filters);

            return response()->json($properties);
        } catch (\Exception $e) {
            \Log::error('AI Search GET Error: ' . $e->getMessage());
            return $this->searchPropertiesDatabase(['location' => $query]);
        }
    }

    /**
     * Search properties with filters from API request
     */
    public function searchProperties(Request $request)
    {
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

        $filters = $request->all();

        try {
            $properties = $this->searchPropertiesDatabase($filters);
            return response()->json($properties);
        } catch (\Exception $e) {
            \Log::error('Search Properties Error: ' . $e->getMessage());
            return response()->json([]);
        }
    }

    /**
     * Core DB query based on filters
     */
    private function searchPropertiesDatabase($filters = [])
    {
        $query = Property::with('user');

        // Location
        if (!empty($filters['location'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('city', 'like', '%' . $filters['location'] . '%')
                    ->orWhere('address', 'like', '%' . $filters['location'] . '%')
                    ->orWhere('province', 'like', '%' . $filters['location'] . '%');
            });
        }

        // Bedrooms
        if (!empty($filters['bedrooms'])) {
            $query->where('bedrooms', '>=', $filters['bedrooms']);
        }

        // Bathrooms
        if (!empty($filters['bathrooms'])) {
            $query->where('bathrooms', '>=', $filters['bathrooms']);
        }

        // Price
        if (!empty($filters['maxPrice'])) {
            $query->where('price', '<=', $filters['maxPrice']);
        }

        // For Sale / Rent
        if (!empty($filters['forSale']) && empty($filters['forRent'])) {
            $query->where('status', 'available');
        } elseif (!empty($filters['forRent']) && empty($filters['forSale'])) {
            $query->where('status', 'rented');
        }

        $properties = $query->get()->map(function ($property) {
            return $this->mapProperty($property);
        });

        return $properties;
    }

    /**
     * Simple keyword-based fallback search
     */
    private function fallbackSearch($query)
    {
        $filters = [];
        $query = strtolower($query);

        Log::info('Processing query: ' . $query);

        // Bedrooms
        if (preg_match('/(\d+)\s*(?:bedroom|bd|bed|br|bedroom?s?)/', $query, $matches)) {
            $filters['bedrooms'] = (int) $matches[1];
        }

        // Bathrooms
        if (preg_match('/(\d+)\s*(?:bathroom|ba|bath|bt|bathroom?s?)/', $query, $matches)) {
            $filters['bathrooms'] = (int) $matches[1];
        }

        // Price
        if (preg_match('/\$(\d+)(?:\s*(?:k|thousand))?/i', $query, $matches)) {
            $price = (int) $matches[1];
            if (isset($matches[2]) && in_array(strtolower($matches[2]), ['k', 'thousand'])) {
                $price *= 1000;
            }
            $filters['maxPrice'] = $price;
        }

        // Location
        $locationKeywords = ['calinan', 'davao', 'toronto', 'vancouver', 'montreal', 'calgary', 'ottawa', 'edmonton', 'manila', 'cebu'];
        foreach ($locationKeywords as $location) {
            if (strpos($query, $location) !== false) {
                $filters['location'] = ucfirst($location);
                break;
            }
        }

        // Sale / Rent
        if (strpos($query, 'sale') !== false || strpos($query, 'buy') !== false) {
            $filters['forSale'] = true;
        }
        if (strpos($query, 'rent') !== false || strpos($query, 'lease') !== false) {
            $filters['forRent'] = true;
        }

        if (!isset($filters['forSale']) && !isset($filters['forRent'])) {
            $filters['forSale'] = true;
            $filters['forRent'] = true;
        }

        Log::info('Extracted filters: ' . json_encode($filters));
        return $filters;
    }

    /**
     * Helper: Map property to API response
     */
    private function mapProperty($property, $withBanner = false)
    {
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
            'status' => $property->status,
            'agent' => [
                'name' => $property->user->name ?? 'Unknown Agent',
                'avatar' => $property->user->avatar ?? 'https://via.placeholder.com/100',
            ],
        ];

        if ($withBanner) {
            $mapped['agent']['banner'] = $property->user->banner ?? 'https://via.placeholder.com/800x200';
        }

        return $mapped;
    }
}
    