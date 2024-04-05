<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->after('google_token', function ($table) {
                $table->string('spotify_token')->nullable();
                $table->string('spotify_refresh_token')->nullable();
                $table->integer('spotify_token_expires_at')->nullable();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('spotify_token');
            $table->dropColumn('spotify_refresh_token');
            $table->dropColumn('spotify_token_expires_at');
        });
    }
};
