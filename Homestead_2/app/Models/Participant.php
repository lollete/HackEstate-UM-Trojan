<?php
// app/Models/Participant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $primaryKey = 'participant_id';
    protected $keyType = 'uuid';
    public $incrementing = false;

    protected $fillable = [
        'event_id',
        'user_id',
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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}