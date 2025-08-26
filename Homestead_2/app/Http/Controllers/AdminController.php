<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Property;
use App\Models\PropertyFeature;
use App\Models\PropertyDetail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
class AdminController extends Controller
{

    public function analytics()
    {
        return Inertia::render('admin/analytics');
    }
    public function properties()
    {
        $properties = Property::latest()->get();
        return Inertia::render('admin/properties', [
            'properties' => $properties
        ]);
    }

    public function createProperty()
    {
        return Inertia::render('admin/createprop');
    }

    public function storeProperty(Request $request)
    {
        $validated = $request->validate([
            'propertyName' => 'required|string|max:255',
            'listingType' => 'required|in:forSale,forRent',
            'price' => 'required|numeric|min:0',
            'location' => 'required|string|max:255',
            'numBedrooms' => 'nullable|integer|min:0',
            'numBathrooms' => 'nullable|integer|min:0',
            'areaSqFt' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'status' => 'required|in:available,pending,sold,rented,draft',
            'imageUrl' => 'nullable|array',
            'imageUrl.*' => 'nullable|string',
        ]);

        $property = Property::create($validated);

        return redirect()->route('admin.properties')->with('success', 'Property created successfully!');
    }

    public function showProperty($id)
    {
        $property = Property::findOrFail($id);
        return Inertia::render('admin/viewprop', [
            'property' => $property
        ]);
    }

    public function editProperty($id)
    {
        $property = Property::findOrFail($id);
        return Inertia::render('admin/editprop', [
            'property' => $property
        ]);
    }

    public function updateProperty(Request $request, $id)
    {
        $property = Property::findOrFail($id);

        $validated = $request->validate([
            'propertyName' => 'required|string|max:255',
            'listingType' => 'required|in:forSale,forRent',
            'price' => 'required|numeric|min:0',
            'location' => 'required|string|max:255',
            'numBedrooms' => 'nullable|integer|min:0',
            'numBathrooms' => 'nullable|integer|min:0',
            'areaSqFt' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'status' => 'required|in:available,pending,sold,rented,draft',
            'imageUrl' => 'nullable|array',
            'imageUrl.*' => 'nullable|string',
        ]);

        $property->update($validated);

        return redirect()->route('admin.properties')->with('success', 'Property updated successfully!');
    }

    public function deleteProperty($id)
    {
        $property = Property::findOrFail($id);
        $property->delete();

        return redirect()->route('admin.properties')->with('success', 'Property deleted successfully!');
    }
    public function inbox()
    {
        return Inertia::render('admin/inbox');
    }
    public function feedback()
    {
        return Inertia::render('admin/feedback');
    }
    public function transaction()
    {
        return Inertia::render('admin/transaction');
    }
    public function CreateEvent()
    {
        return Inertia::render('admin/creEvent');
    }
    public function verification()
    {
        return Inertia::render('admin/verify');
    }
    public function index(Request $request)
    {
        // Get search parameters
        $search = $request->input('search');
        $status = $request->input('status', 'all');
        $type = $request->input('type', 'all');

        // Build query with filters
        $properties = Property::with('user', 'features', 'details')
            ->when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            })
            ->when($status !== 'all', function ($query) use ($status) {
                return $query->where('status', $status);
            })
            ->when($type !== 'all', function ($query) use ($type) {
                return $query->where('type', $type);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        //             return Inertia::render('admin/index');

        return Inertia::render('admin/index', [
            'properties' => $properties,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'type' => $type,
            ]
        ]);
    }

    /**
     * Show the form for creating a new property.
     */
    public function create()
    {
        return Inertia::render('Admin/Properties/Create');
    }

    /**
     * Store a newly created property in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:house,apartment,condo,townhouse,land,commercial',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'zipcode' => 'required|string|max:10',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'floor_area' => 'nullable|numeric|min:0',
            'lot_area' => 'nullable|numeric|min:0',
            'status' => 'required|string|in:available,pending,sold,rented,draft,archived',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'details' => 'nullable|array',
            'details.*.label' => 'required|string|max:255',
            'details.*.value' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            // Handle image upload
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('properties', 'public');
            }

            // Create the property
            $property = Property::create([
                'user_id' => auth()->id(),
                'title' => $request->title,
                'type' => $request->type,
                'description' => $request->description,
                'price' => $request->price,
                'address' => $request->address,
                'city' => $request->city,
                'province' => $request->province,
                'zipcode' => $request->zipcode,
                'bedrooms' => $request->bedrooms,
                'bathrooms' => $request->bathrooms,
                'floor_area' => $request->floor_area,
                'lot_area' => $request->lot_area,
                'status' => $request->status,
                'image' => $imagePath,
            ]);

            // Add features if provided
            if ($request->has('features')) {
                foreach ($request->features as $feature) {
                    PropertyFeature::create([
                        'property_id' => $property->id,
                        'feature' => $feature,
                    ]);
                }
            }

            // Add details if provided
            if ($request->has('details')) {
                foreach ($request->details as $detail) {
                    PropertyDetail::create([
                        'property_id' => $property->id,
                        'label' => $detail['label'],
                        'value' => $detail['value'],
                    ]);
                }
            }

            return redirect()->route('admin.properties.index')
                ->with('success', 'Property created successfully.');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error creating property: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Display the specified property.
     */
    public function show($id)
    {
        $property = Property::with('user', 'features', 'details')->findOrFail($id);

        return Inertia::render('Admin/Properties/Show', [
            'property' => $property
        ]);
    }

    /**
     * Show the form for editing the specified property.
     */
    public function edit($id)
    {
        $property = Property::with('features', 'details')->findOrFail($id);

        return Inertia::render('Admin/Properties/Edit', [
            'property' => $property
        ]);
    }

    /**
     * Update the specified property in storage.
     */
    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);

        // Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:house,apartment,condo,townhouse,land,commercial',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'zipcode' => 'required|string|max:10',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'floor_area' => 'nullable|numeric|min:0',
            'lot_area' => 'nullable|numeric|min:0',
            'status' => 'required|string|in:available,pending,sold,rented,draft,archived',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'details' => 'nullable|array',
            'details.*.label' => 'required|string|max:255',
            'details.*.value' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($property->image) {
                    Storage::disk('public')->delete($property->image);
                }

                $imagePath = $request->file('image')->store('properties', 'public');
                $property->image = $imagePath;
            }

            // Update the property
            $property->update([
                'title' => $request->title,
                'type' => $request->type,
                'description' => $request->description,
                'price' => $request->price,
                'address' => $request->address,
                'city' => $request->city,
                'province' => $request->province,
                'zipcode' => $request->zipcode,
                'bedrooms' => $request->bedrooms,
                'bathrooms' => $request->bathrooms,
                'floor_area' => $request->floor_area,
                'lot_area' => $request->lot_area,
                'status' => $request->status,
            ]);

            // Update features
            if ($request->has('features')) {
                // Delete existing features
                PropertyFeature::where('property_id', $property->id)->delete();

                // Add new features
                foreach ($request->features as $feature) {
                    PropertyFeature::create([
                        'property_id' => $property->id,
                        'feature' => $feature,
                    ]);
                }
            }

            // Update details
            if ($request->has('details')) {
                // Delete existing details
                PropertyDetail::where('property_id', $property->id)->delete();

                // Add new details
                foreach ($request->details as $detail) {
                    PropertyDetail::create([
                        'property_id' => $property->id,
                        'label' => $detail['label'],
                        'value' => $detail['value'],
                    ]);
                }
            }

            return redirect()->route('admin.properties.index')
                ->with('success', 'Property updated successfully.');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error updating property: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Archive the specified property (soft delete).
     */
    public function archive($id)
    {
        try {
            $property = Property::findOrFail($id);
            $property->update(['status' => 'archived']);

            return redirect()->route('admin.properties.index')
                ->with('success', 'Property archived successfully.');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error archiving property: ' . $e->getMessage());
        }
    }

    /**
     * Restore an archived property.
     */
    public function restore($id)
    {
        try {
            $property = Property::findOrFail($id);
            $property->update(['status' => 'draft']);

            return redirect()->route('admin.properties.index')
                ->with('success', 'Property restored successfully.');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error restoring property: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified property from storage (permanent delete).
     */
    public function destroy($id)
    {
        try {
            $property = Property::findOrFail($id);

            // Delete image if exists
            if ($property->image) {
                Storage::disk('public')->delete($property->image);
            }

            // Delete related features and details
            PropertyFeature::where('property_id', $property->id)->delete();
            PropertyDetail::where('property_id', $property->id)->delete();

            // Delete the property
            $property->delete();

            return redirect()->route('admin.properties.index')
                ->with('success', 'Property deleted permanently.');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error deleting property: ' . $e->getMessage());
        }
    }

    /**
     * Display archived properties.
     */
    public function archived()
    {
        $properties = Property::with('user')
            ->where('status', 'archived')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Properties/Archived', [
            'properties' => $properties
        ]);
    }
}
