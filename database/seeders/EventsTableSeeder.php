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
            'date' => '2021-10-02',
            'time_start' => '10:00:00',
            'time_end' => '10:50:00',
            'location_id' => 1,
            'is_cancelled' => 1,
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vestibulum massa et vestibulum luctus. Donec condimentum arcu non neque tincidunt vehicula. Phasellus ut iaculis eros, ac dapibus enim. Sed tempor enim vitae dignissim pellentesque. Aliquam tincidunt turpis a dapibus consequat. Phasellus id lacus aliquet, fermentum quam eu, porta dolor. Suspendisse ultricies lorem et ultricies condimentum.',
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Event B',
            'date' => '2021-10-02',
            'time_start' => '12:00:00',
            'time_end' => '12:50:00',
            'location_id' => 2,
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Event C',
            'date' => '2021-10-02',
            'time_start' => '11:00:00',
            'time_end' => '11:50:00',
            'location_id' => 1,
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Event D',
            'date' => '2021-10-02',
            'time_start' => '13:00:00',
            'time_end' => '13:50:00',
            'location_id' => 3,
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Game Room',
            'date' => '2021-10-02',
            'time_start' => '10:00:00',
            'time_end' => '22:00:00',
            'location_id' => 5,
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Event E',
            'date' => '2021-10-03',
            'time_start' => '13:00:00',
            'time_end' => '13:50:00',
            'location_id' => 4,
        ]);

        DB::table('events')->insert([
            'schedule_id' => 1,
            'name' => 'Game Room',
            'date' => '2021-10-03',
            'time_start' => '10:00:00',
            'time_end' => '22:00:00',
            'location_id' => 5,
        ]);
    }
}
