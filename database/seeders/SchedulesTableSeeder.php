<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SchedulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('schedules')->insert([
            'user_id' => 1,
            'name' => 'Schedule A',
            'start_date' => '2021-10-02',
            'end_date' => '2021-10-03',
        ]);
    }
}
