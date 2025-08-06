<?php
namespace App\Models;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->id('participant_id');
            $table->foreignUuid('event_id')->constrained('events', 'event_id');
            $table->foreignUuid('user_id')->constrained('users', 'user_id');
            $table->string('full_name');
            $table->string('email_address');
            $table->string('payment_method');
            $table->decimal('price', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->timestamps();
        });
        Schema::create('event_bookmarks', function (Blueprint $table) {
            $table->foreignUuid('user_id')->constrained('users', 'user_id');
            $table->foreignUuid('event_id')->constrained('events', 'event_id');
            $table->primary(['user_id', 'event_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
