<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function ListingView()
    {
        return Inertia::render('properties/listingView');
    }
}
