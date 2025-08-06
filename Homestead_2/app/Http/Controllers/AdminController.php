<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/index');
    }
    public function analytics()
    {
        return Inertia::render('admin/analytics');
    }
    public function properties()
    {
        return Inertia::render('admin/properties');
    }
    public function inbox()
    {
        return Inertia::render('admin/inbox');
    }
    public function feedback()
    {
        return Inertia::render('admin/feedback');
    }
    public function transaction()
    {
        return Inertia::render('admin/transaction');
    }
    public function CreateEvent()
    {
        return Inertia::render('admin/creEvent');
    }
    public function verification()
    {
        return Inertia::render('admin/verify');
    }
}
