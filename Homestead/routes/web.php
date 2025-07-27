<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/Property/{id}', [ClientController::class, 'ListingView'])->name('properties.listingView');
Route::get('/Bookmark/', [ClientController::class, 'BookmarkView'])->name('properties.BookmarkView');
Route::get('/Event/', [EventController::class, 'EventView'])->name('event.EventView');
Route::get('/Event/{id}', [EventController::class, 'EventDetails'])->name('event.EventDetails');


Route::get('/Chat',[ChatController::class,'Chatlist'])->name('agent.viewChat');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', action: function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
