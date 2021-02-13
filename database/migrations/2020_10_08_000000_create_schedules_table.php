<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('name', 255);
            $table->date('start_date');
            $table->date('end_date');
            $table->string('social_fb', 255)->nullable();
            $table->string('social_tw', 255)->nullable();
            $table->string('social_ig', 255)->nullable();
            $table->string('social_web', 255)->nullable();
            $table->boolean('is_live')->default(0);
            $table->uuid('public_string')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedules');
    }
}
