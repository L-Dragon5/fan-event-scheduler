<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExhibitorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('exhibitors')->insert([
            'schedule_id' => 1,
            'name' => 'Vendor A',
            'category' => 'Vendor',
            'url' => 'https://google.com/',
        ]);

        DB::table('exhibitors')->insert([
            'schedule_id' => 1,
            'name' => 'Artist A',
            'category' => 'Artist',
        ]);

        DB::table('exhibitors')->insert([
            'schedule_id' => 1,
            'name' => 'Artist B',
            'category' => 'Artist',
        ]);

        DB::table('exhibitors')->insert([
            'schedule_id' => 1,
            'name' => 'Artist C',
            'category' => 'Artist',
        ]);
    }
}
