<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $primaryKey = 'participant_id';

    protected $fillable = [
        'event_id',
        'full_name',
        'email_address',
        'payment_method',
        'price',
        'status',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }
}
