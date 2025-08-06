<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PropertyController;
use App\Models\User;
use App\Models\Event;
use App\Models\Participant;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::get('/Property/{id}', [ClientController::class, 'ListingView'])->name('properties.listingView');
Route::get('/Bookmark/', [ClientController::class, 'BookmarkView'])->name('properties.BookmarkView');
Route::get('/Agent-profile/1', [ClientController::class, 'ProfileAgent'])->name('agent.ProfileAgent');


Route::post('/admin/event', [EventController::class, 'store'])->name('events.store');

Route::get('/Event', [EventController::class, 'EventView'])->name('event.EventView');
Route::get('/events/{event}', [EventController::class, 'EventDetails'])->name('events.details');
Route::post('/events/{event}/bookmark', [EventController::class, 'bookmark'])->name('events.bookmark');
Route::post('/events/{event}/participate', [EventController::class, 'participate'])->name('admin.participate');;
// Route::get('/events', [EventController::class, 'EventView'])->name('events.view');
// Route::get('/events/{id}', [EventController::class, 'EventDetails'])->name('events.details');
Route::post('/admin/event', [EventController::class, 'store'])->middleware('auth');
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


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('admin/dashboard', [AdminController::class, 'index'])->name('admin.index');
    Route::get('admin/analytics', [AdminController::class, 'analytics'])->name('admin.analytics');
    Route::get('admin/properties', [AdminController::class, 'properties'])->name('admin.properties');
    Route::get('admin/transaction', [AdminController::class, 'transaction'])->name('admin.transaction');
    Route::get('admin/inbox', [AdminController::class, 'inbox'])->name('admin.inbox');
    Route::get('admin/feedback', [AdminController::class, 'feedback'])->name('admin.feedback');
    Route::get('admin/property', [AdminController::class, 'properties'])->name('admin.property');
    Route::get('admin/event', [AdminController::class, 'CreateEvent'])->name('admin.createEvent');
    Route::get('admin/verification', [AdminController::class, 'verification'])->name('admin.verification');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', action: function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
