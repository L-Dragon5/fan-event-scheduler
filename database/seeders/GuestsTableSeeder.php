<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('guests')->insert([
            'schedule_id' => 1,
            'name' => 'Guest A',
            'category' => 'Voice Actor',
            'social_fb' => 'https://facebook.com/',
            'social_tw' => 'https://twitter.com/',
        ]);

        DB::table('guests')->insert([
            'schedule_id' => 1,
            'name' => 'Guest B',
            'category' => 'Voice Actress',
            'social_tw' => 'https://twitter.com/',
        ]);

        DB::table('guests')->insert([
            'schedule_id' => 1,
            'name' => 'Guest C',
            'category' => 'Cosplay'
        ]);

        DB::table('guests')->insert([
            'schedule_id' => 1,
            'name' => 'Guest D',
            'category' => 'Cosplay'
        ]);
    }
}
