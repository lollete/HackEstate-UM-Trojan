<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'label',
        'value',
    ];

    // 🔗 Back to the main property
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
