<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('locations')->insert([
            'schedule_id' => 1,
            'name' => 'Panel Room 1'
        ]);

        DB::table('locations')->insert([
            'schedule_id' => 1,
            'name' => 'Panel Room 2'
        ]);

        DB::table('locations')->insert([
            'schedule_id' => 1,
            'name' => 'Panel Room 3'
        ]);

        DB::table('locations')->insert([
            'schedule_id' => 1,
            'name' => 'Panel Room 4'
        ]);

        DB::table('locations')->insert([
            'schedule_id' => 1,
            'name' => 'Game Room'
        ]);
    }
}
