<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('documents')->insert([
            [
                'user_id' => 1, 
                'title' => 'Dialogue with trypho',
                'file_size' => 204800, // File size in bytes
                'description' => 'Justine the martyr dialogues with trypho the Jew on Christianity and Judaism',
                'file_path' => 'https://drive.google.com/file/d/1nXh4FsZHAk_Sh1OThdjkANa6q_YTya8e/view?usp=sharing',
                'file_type' => 'pdf',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'title' => 'Overview of Calvinism',
                'file_size' => 512000, // File size in bytes
                'description' => 'Oview of Calvinistic Soteriological System in contrast to other views',
                'file_path' => 'https://drive.google.com/file/d/1GGuS-ziGVmaYP2vF9cMTh-Gko1SjqIjk/view?usp=sharing',
                'file_type' => 'pdf',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
