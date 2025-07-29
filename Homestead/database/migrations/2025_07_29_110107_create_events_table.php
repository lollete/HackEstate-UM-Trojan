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
            $table->text('date');
            $table->unsignedBigInteger('start_time');
            $table->unsignedBigInteger('end_time');
            $table->string('type', 15);
            $table->integer('price');
            $table->string('image')->nullable();
            $table->string('description', 250);
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
