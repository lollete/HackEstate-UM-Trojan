<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function EventView()
    {
        return Inertia::render('event/eventView');
    }
    public function EventDetails()
    {
        return Inertia::render('event/eventDetails');
    }
}
   

