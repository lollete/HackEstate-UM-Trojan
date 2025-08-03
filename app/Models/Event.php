<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $primaryKey = 'event_id';

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
    ];

    public function participants()
    {
        return $this->hasMany(Participant::class, 'event_id', 'event_id');
    }
}
