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
            $table->unsignedBigInteger('event_id');
            $table->string('full_name', 25);
            $table->string('email_address', 50);
            $table->text('payment_method');
            $table->integer('price');
            $table->text('status');
            $table->timestamps();

            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
