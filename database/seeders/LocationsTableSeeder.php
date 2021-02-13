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
            'name' => 'Panel A'
        ]);

        DB::table('locations')->insert([
            'schedule_id' => 1,
            'name' => 'Panel B'
        ]);

        DB::table('locations')->insert([
            'schedule_id' => 1,
            'name' => 'Panel C'
        ]);

        DB::table('locations')->insert([
            'schedule_id' => 1,
            'name' => 'Game Room'
        ]);
    }
}
