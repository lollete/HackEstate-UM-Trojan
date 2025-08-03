<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function Buy()
    {
        return Inertia::render('landing/buy');
    }

    public function Rent()
    {
        return Inertia::render('landing/rent');
    }
    public function Agents()
    {
        return Inertia::render('landing/agents');
    }
    public function Events()
    {
        return Inertia::render('landing/event');
    }
    public function ContactUs()
    {
        return Inertia::render('landing/contactUs');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
