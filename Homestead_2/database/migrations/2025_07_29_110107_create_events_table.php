<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id('event_id');
            $table->string('name', 50);
            $table->string('location', 100);

            // Use 'date' column type
            $table->date('date');

            // Use 'time' column type
            $table->time('start_time');
            $table->time('end_time');

            $table->enum('type', ['public', 'private', 'vip', 'corporate']); // Adjust as needed
            $table->integer('price');
            $table->string('image')->nullable();
            $table->string('description', 250);

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->json('gallery_images')->nullable();

            // Enum for 'type_of_event' stored as a string for simplicity in JSON
            $table->json('type_of_event')->nullable(); // e.g. ["conference", "workshop"]

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
