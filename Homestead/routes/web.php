<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PropertyController;
use App\Models\User;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::get('/Property/{id}', [ClientController::class, 'ListingView'])->name('properties.listingView');
Route::get('/Bookmark/', [ClientController::class, 'BookmarkView'])->name('properties.BookmarkView');
Route::get('/Agent-profile/1', [ClientController::class, 'ProfileAgent'])->name('agent.ProfileAgent');
Route::get('/Event/', [EventController::class, 'EventView'])->name('event.EventView');
Route::get('/Event/{id}', [EventController::class, 'EventDetails'])->name('event.EventDetails');



// Route::get('/Chat', [ChatController::class, 'Chatlist'])->name('agent.viewChat');
Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
Route::get('/chat/{agent}', [ChatController::class, 'chatWithAgent'])->name('agent.viewChat');
Route::post('/chats', [ChatController::class, 'store'])->name('chats.store');
Route::post('/chats/send', [ChatController::class, 'sendMessage'])->name('chats.send');

Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
Route::get('/Property/{id}', [PropertyController::class, 'show'])->name('properties.show');
Route::get('/chat/index-data', [ChatController::class, 'indexData'])->middleware('auth');


// Route::get('/agent-profile/{id}', [AgentController::class, 'show'])->name('agent.profile');
Route::get('/agent/{id}', [ClientController::class, 'ProfileAgent']);



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', action: function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
