<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('event_types')->insert([
            'schedule_id' => 1,
            'name' => 'Main Event',
        ]);

        DB::table('event_types')->insert([
            'schedule_id' => 1,
            'name' => 'Q&A Panel',
        ]);

        DB::table('event_types')->insert([
            'schedule_id' => 1,
            'name' => 'Instructional Panel',
        ]);

        DB::table('event_types')->insert([
            'schedule_id' => 1,
            'name' => 'Game Show Panel',
        ]);

        DB::table('event_types')->insert([
            'schedule_id' => 1,
            'name' => 'Guest Event',
        ]);
    }
}
