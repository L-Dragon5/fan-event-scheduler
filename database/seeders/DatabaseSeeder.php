<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            SchedulesTableSeeder::class,
            LocationsTableSeeder::class,
            GuestsTableSeeder::class,
            RulesTableSeeder::class,
            ExhibitorsTableSeeder::class,
            EventTypesTableSeeder::class,
            EventsTableSeeder::class,
        ]);

        /*
        $this->call([
            PartnersTableSeeder::class,
            HomeTableSeeder::class,
        ]);
        */
    }
}
