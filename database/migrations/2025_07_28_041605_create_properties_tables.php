<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // 1. Properties table
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Agent/User who listed it

            $table->string('title');
            $table->enum('type', ['house', 'apartment', 'condo', 'land', 'commercial'])->default('house');
            $table->text('description')->nullable();
            $table->decimal('price', 15, 2);
            $table->string('address');
            $table->string('city');
            $table->string('province');
            $table->string('zipcode')->nullable();

            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('floor_area')->nullable();
            $table->integer('lot_area')->nullable();

            $table->string('image')->nullable(); // Cover photo
            $table->enum('status', ['available', 'sold', 'rented'])->default('available');

            $table->timestamps();
        });

        Schema::create('property_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties')->onDelete('cascade');

            $table->string('feature');
            $table->timestamps();
        });

        Schema::create('property_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties')->onDelete('cascade');

            $table->string('label'); 
            $table->string('value');  
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('property_details');
        Schema::dropIfExists('property_features');
        Schema::dropIfExists('properties');
    }
};
