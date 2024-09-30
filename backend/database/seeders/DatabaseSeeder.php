<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // Create an admin user
        User::factory()->create([
            'name'=>'Admin',
            'first_name' => 'Kibooli',
            'last_name'=>'Felix',
            'email' => 'kiboolif@gmail.com',
            'password' => bcrypt('christosestinkalon'),
            'is_admin' => true,
        ]);
    }
}
