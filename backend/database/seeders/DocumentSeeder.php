<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DocumentSeeder extends Seeder
{
    public function run()
    {
        DB::table('documents')->insert([
            [
                'id' => 1,
                'user_id'=>1,
                'title' => 'Launching the SAUTIplus Ecosystem',
                'description' => '',
                'file_path' => 'https://drive.google.com/file/d/1VS0A7fbMXwG6Y-6M9sUbtpHppbkG2GJe/view?usp=drive_link',
                'year' => '2022-01-23',
                'summary' => 'Launched the SAUTIplus Ecosystem to promote Adolescent and Youth Sexual and Reproductive Health Rights (AYSRHR) through digital platforms. This initiative utilized data-driven websites and social media campaigns to engage young people and raise awareness of critical health issues',
                'organization' => 'Reach A Hand Uganda',
                'video_url' => 'https://www.youtube.com/live/bzs9HOJA6mc?si=sFomr-3YuglcdlPd',
                'image_urls' => 'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732366504/project_images/lroxlvuy5vfdbhcgknt7.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732366508/project_images/qvtojdzrrohjma4ubqc4.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732366513/project_images/sayjkfxo0myyb3ilnnoz.jpg',
                'category_ids' => '2,3',
                'created_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 23, 2024 12:56 PM'),
                'updated_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 23, 2024 02:54 PM'),
            ],
            [
                'id' => 2,
                'user_id'=>1,
                'title' => 'Designed The Power of Learning Tool',
                'description' => '',
                'file_path' => 'https://drive.google.com/file/d/1GGuS-ziGVmaYP2vF9cMTh-Gko1SjqIjk/view?usp=drive_link',
                'year' => '2022-01-23',
                'summary' => 'Designed The Power of Learning Tool to foster discussions among CSO actors on topics like mental health, donor relations, and challenging operational environments. The tool encourages engagement and reflection through user-friendly, interactive modules',
                'organization' => 'Dutch Ministry of Foreign Affairs (via Mannion Daniels)',
                'video_url' => 'https://www.youtube.com/live/bzs9HOJA6mc?si=sFomr-3YuglcdlPd',
                'image_urls' => 'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732367647/project_images/gelrwhm7que8yidfbwlb.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732367663/project_images/xgkwan95vqz86q9qr9qt.jpg',
                'category_ids' => '3,4,5',
                'created_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 23, 2024 01:15 PM'),
                'updated_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 23, 2024 03:11 PM'),
            ],
            [
                'id' => 3,
                'user_id'=>1,
                'title' => 'Membership sessions',
                'description' => '',
                'file_path' => 'https://drive.google.com/file/d/1dWTjL5QzidH_SksckG0baLiPM9lqOF6c/view?usp=drive_link',
                'year' => '2024-01-23',
                'summary' => 'Conducted tailored training sessions for member organizations, focusing on digital safety, storytelling techniques, and strategic communication to enhance advocacy efforts and audience engagement',
                'organization' => 'Uganda Key Populations Consortium',
                'video_url' => 'https://www.youtube.com/live/bzs9HOJA6mc?si=sFomr-3YuglcdlPd',
                'image_urls' => 'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732369234/project_images/bnjjjx60tjyhksuzwzps.png,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732369239/project_images/fujurnjhgdddsqgjqtjl.jpg',
                'category_ids' => '5,6',
                'created_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 23, 2024 01:41 PM'),
                'updated_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 23, 2024 01:41 PM'),
            ],
            [
                'id' => 4,
                'user_id'=>1,
                'title' => 'Building and Leading Executive team',
                'description' => '',
                'file_path' => 'https://drive.google.com/file/d/1dWTjL5QzidH_SksckG0baLiPM9lqOF6c/view?usp=drive_link',
                'year' => '2024-01-23',
                'summary' => 'Built and led a high-performing executive team at Marimba Communications Group. Fostered collaboration, alignment with strategic objectives, and innovation to position the company as a leader in the communications industry',
                'organization' => 'Marimba Communications Group',
                'video_url' => 'https://www.youtube.com/live/bzs9HOJA6mc?si=sFomr-3YuglcdlPd',
                'image_urls' => 'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732380084/project_images/ics1kv8lymknw3ncb3ta.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732380091/project_images/l2e3wna9erkkv5kbr6t5.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732380096/project_images/fmjrrstnrpun6qgjrbn5.jpg',
                'category_ids' => '5,6',
                'created_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 23, 2024 04:42 PM'),
                'updated_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 23, 2024 04:42 PM'),
            ],
        ]);
    }
}
