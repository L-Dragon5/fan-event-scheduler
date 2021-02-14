<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Event A',
            'date' => '2020-10-02',
            'time_start' => '10:00:00',
            'time_end' => '10:50:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Event B',
            'date' => '2020-10-02',
            'time_start' => '12:00:00',
            'time_end' => '12:50:00',
            'location_id' => '2',
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Event C',
            'date' => '2020-10-02',
            'time_start' => '11:00:00',
            'time_end' => '11:50:00',
            'location_id' => '1',
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Event D',
            'date' => '2020-10-02',
            'time_start' => '13:00:00',
            'time_end' => '13:50:00',
            'location_id' => '3',
        ]);
    }
}
