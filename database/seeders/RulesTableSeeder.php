<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rules')->insert([
            'schedule_id' => 1,
            'title' => 'General Rules',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vestibulum massa et vestibulum luctus. Donec condimentum arcu non neque tincidunt vehicula. Phasellus ut iaculis eros, ac dapibus enim. Sed tempor enim vitae dignissim pellentesque. Aliquam tincidunt turpis a dapibus consequat. Phasellus id lacus aliquet, fermentum quam eu, porta dolor. Suspendisse ultricies lorem et ultricies condimentum.'
        ]);

        DB::table('rules')->insert([
            'schedule_id' => 1,
            'title' => 'Other Rules',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vestibulum massa et vestibulum luctus. Donec condimentum arcu non neque tincidunt vehicula. Phasellus ut iaculis eros, ac dapibus enim. Sed tempor enim vitae dignissim pellentesque. Aliquam tincidunt turpis a dapibus consequat. Phasellus id lacus aliquet, fermentum quam eu, porta dolor. Suspendisse ultricies lorem et ultricies condimentum.'
        ]);
    }
}
