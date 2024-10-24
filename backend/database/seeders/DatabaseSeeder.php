<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // Create an admin user
        // dd(\Faker\Factory::create('en_us'));
        // User::factory()->create([
        //     'name'=>'Admin',
        //     'first_name' => 'Kibooli',
        //     'last_name'=>'Felix',
        //     'email' => 'kiboolif@gmail.com',
        //     'password' => bcrypt('christosestinkalon'),
        //     'is_admin' => true,
        // ]);
         // Directly insert an admin user into the users table
         DB::table('users')->insert([
            'name' => 'Admin',
            'first_name' => 'Kibooli',
            'last_name' => 'Felix',
            'email' => 'kiboolif@gmail.com',
            'password' => Hash::make('christosestinkalon'),
            'is_admin' => true,
            'email_verified_at' => now(),
            'remember_token' => null,
        ]);
    }
}
