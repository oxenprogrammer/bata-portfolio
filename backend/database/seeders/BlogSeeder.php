<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'user_id' => 1, // Replace with actual user ID
                'title' => 'First Blog Post',
                'content' => 'Content of the first blog post.',
                'excerpt' => 'This is a short excerpt of the first blog post.',
                'status' => 'published',
                'tags' => "[\"javascript\",\"react\",\"laravel\"]", // Encode the array as JSON string
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1, // Replace with actual user ID
                'title' => 'Second Blog Post',
                'content' => 'Content of the second blog post.',
                'excerpt' => 'This is a short excerpt of the second blog post.',
                'status' => 'published',
                'tags' =>  "[\"javascript\",\"react\",\"laravel\"]",
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more blogs as needed
        ];

        foreach ($blogs as $blogData) {
            // Insert blog post and get the ID
            $blogId = DB::table('blogs')->insertGetId($blogData);

            // Sample image URLs to associate with the blog post
            $images = [
                'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1730801601/blog_images/Screenshot%20%2820%29.png',
                'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1730801605/blog_images/Screenshot%20%2823%29.png',
                'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1728038072/fdtkivims0ntl4qrvawy.jpg',
            ];

            foreach ($images as $imageUrl) {
                DB::table('blog_images')->insert([
                    'blog_id' => $blogId,
                    'image_path' => $imageUrl,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}