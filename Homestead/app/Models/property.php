<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'type',
        'description',
        'price',
        'address',
        'city',
        'province',
        'zipcode',
        'bedrooms',
        'bathrooms',
        'floor_area',
        'lot_area',
        'image',
        'status',
    ];
    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }
    // 🔗 Relation to user (agent)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 🔗 Features like garage, wifi
    public function features()
    {
        return $this->hasMany(PropertyFeature::class);
    }

    // 🔗 Custom details like year built
    public function details()
    {
        return $this->hasMany(PropertyDetail::class);
    }
}
