<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    // Specify the custom primary key
    protected $primaryKey = 'event_id';

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'event_id';
    }

    // Add fillable properties if you have them for mass assignment
    protected $fillable = [
        'name',
        'location',
        'date',
        'start_time',
        'end_time',
        'type',
        'price',
        'image',
        'description',
        'user_id',
        'gallery_images',
        'type_of_event',
    ];

    protected $casts = [
        'date' => 'date',
        'gallery_images' => 'array',
        'type_of_event' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookmarkedByUsers()
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'event_id', 'user_id');
    }

    public function participants()
    {
        return $this->hasMany(Participant::class, 'event_id', 'event_id');
    }
    public function bookmarkedEvents()
    {
        return $this->belongsToMany(Event::class, 'bookmarks');
    }

}