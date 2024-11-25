<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'user_id' => 1,
                'title' => "The Rise of Laravel 11",
                'content' => "<p><strong>Laravel</strong></p>\r\n<p>Discover the latest features and improvements in Laravel 11 that make web development more powerful and efficient than ever before</p>",
                'excerpt' => "<p>This blog is about Laravel</p>",
                'status' => 'published',
                'tags' => json_encode('["laravel", "Tech", "Php"]'),
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'title' => "Understanding Romans 9-11",
                'content' => "<p>\"A deep dive into the theological insights of Romans 9-11, focusing on Israel's election to service and God's sovereign plan.\"</p>",
                'excerpt' => "<p>\"A deep dive into the theological insights of Romans 9-11, focusing on Israel's election to service and God's sovereign plan.\"</p>",
                'status' => 'published',
                'tags' => json_encode('["Bible Study", "Theology"]'),
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'title' => "Chess Strategies for Beginners",
                'content' => "<p><em><strong>The Secrets of Chess</strong></em></p>\r\n<p>Unravel the secrets to mastering chess with beginner-friendly strategies and tips to improve your game</p>",
                'excerpt' => "<p>Unravel the secrets to mastering chess with beginner-friendly strategies and tips to improve your game</p>",
                'status' => 'published',
                'tags' => json_encode('["Chess", "Hobbies"]'),
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'title' => "The Role of AI in Modern Software Development",
                'content' => "<h4><strong>1. Code Generation and Assistance</strong></h4>..."
                    . "Add your detailed AI content here...",
                'excerpt' => "<p>Artificial Intelligence (AI) has rapidly become a cornerstone of innovation across industries...</p>",
                'status' => 'published',
                'tags' => json_encode('["AI", "Web Development", "Technology Trends", "Coding", "Innovation"]'),
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        $images = [
            1 => [
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732518465/ys7v7vmfm9kmm0hfxi9y.jpg",
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732518486/xdiday5qhtoeb5pvhw8t.jpg",
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732518492/nsvvitozxmk7sepduwhu.jpg",
            ],
            2 => [
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732518853/w9yrvfv0cquxlvjnlo5r.jpg",
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732518857/tteaj6zyijahfqtcpxpi.jpg",
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732518866/n6ibuacxidtlzgifbxdu.jpg",
            ],
            3 => [
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732519117/blog_images/pexels-pixabay-139392.jpg",
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732519122/blog_images/pexels-felixmittermeier-957312.jpg",
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732519133/blog_images/pexels-vlada-karpovich-6115019.jpg",
            ],
            4 => [
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732381488/blog_images/artificial-intelligence-3382507_1280.jpg",
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732381496/blog_images/software-developer-6521720_1280.jpg",
                "https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732381500/blog_images/technology-6701504_1280.jpg",
            ],
        ];

        foreach ($blogs as $index => $blogData) {
            $blogId = DB::table('blogs')->insertGetId($blogData);

            foreach ($images[$index + 1] as $imageUrl) {
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
