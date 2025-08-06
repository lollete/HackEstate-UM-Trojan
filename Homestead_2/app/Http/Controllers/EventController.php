<?php
// app/Http/Controllers/EventController.php
namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
class EventController extends Controller
{
    public function EventView(Request $request)
    {
        $sort = $request->input('sort', 'top');

        $events = Event::query()
            ->with(['user'])
            ->when($sort === 'latest', function ($query) {
                return $query->latest();
            })
            ->when($sort === 'relevance', function ($query) {
                return $query->orderBy('name', 'desc');
            })
            ->when($sort === 'top', function ($query) {
                return $query->orderBy('created_at', 'desc');
            })
            ->paginate(12);

        return Inertia::render('event/Index', [
            'events' => $events,
            'sort' => $sort,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    // app/Http/Controllers/EventController.php
    public function EventDetails(Event $event)
    {
        $event->load(['user', 'participants', 'bookmarkedByUsers']);

        return Inertia::render('event/Show', [
            'event' => [
                'id' => $event->id,
                'name' => $event->name,
                'location' => $event->location,
                'date' => $event->date,
                'start_time' => $event->start_time,
                'end_time' => $event->end_time,
                'price' => $event->price,
                'image' => $event->image,
                'gallery_images' => $event->gallery_images ?? [],
                'description' => $event->description,
                'type_of_event' => $event->type_of_event ?? [],
                'user' => $event->user ? [
                    'id' => $event->user->id,
                    'name' => $event->user->name,
                    'avatar' => $event->user->avatar,
                ] : null,
                'participants_count' => $event->participants->count(),
                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
            ]
        ]);
    }

    public function bookmark(Event $event)
    {
        $user = Auth::user();

        if ($event->bookmarkedByUsers()->where('user_id', $user->id)->exists()) {
            $event->bookmarkedByUsers()->detach($user->id);
            $message = 'Event removed from bookmarks';
        } else {
            $event->bookmarkedByUsers()->attach($user->id);
            $message = 'Event added to bookmarks';
        }

        return back()->with('success', $message);
    }

    public function participate(Request $request, Event $event)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email_address' => 'required|email|max:255',
            'payment_method' => 'required|string|in:credit_card,paypal,gcash',
        ]);

        $participant = new Participant([
            'user_id' => Auth::id(),
            'full_name' => $validated['full_name'],
            'email_address' => $validated['email_address'],
            'payment_method' => $validated['payment_method'],
            'price' => $event->price,
            'status' => 'pending',
        ]);

        $event->participants()->save($participant);

        return back()->with('success', 'Your participation has been registered!');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'location' => 'required|string|max:100',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
            'type' => 'required|string|in:conference,seminar,workshop,meetup,webinar',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable',
            'description' => 'required|string|max:250',
        ]);

        $imagePath = $request->hasFile('image')
            ? $request->file('image')->store('event_images', 'public')
            : $request->input('image');

        $event = Event::create([
            'name' => $validated['name'],
            'location' => $validated['location'],
            'date' => $validated['date'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'type' => $validated['type'],
            'price' => $validated['price'],
            'image' => $imagePath,
            'description' => $validated['description'],
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event created successfully',
            'event' => $event
        ]);
    }
}
