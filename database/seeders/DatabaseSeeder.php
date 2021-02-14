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
        ]);

        /*
        $this->call([
            EventTypesTableSeeder::class,
            ExhibitorsTableSeeder::class,
            PartnersTableSeeder::class,
            EventsTableSeeder::class,
            HomeTableSeeder::class,
        ]);
        */
    }
}
