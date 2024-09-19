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
        Schema::table('documents', function (Blueprint $table) {
             // Check if the 'id' column doesn't already exist
             if (!Schema::hasColumn('documents', 'id')) {
                $table->id()->first(); // Add id column at the beginning
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            //
            $table->dropColumn('id');
        });
    }
};
