<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $documents = [
            [
                'id' => 1,
                'title' => 'The Power of Learning Tool',
                'user_id' => 1,
                'description' => null,
                'file_path' => 'https://drive.google.com/file/d/1GGuS-ziGVmaYP2vF9cMTh-Gko1SjqIjk/view?usp=drive_link',
                'year' => '2024-11-13',
                'summary' => strip_tags('Designed <em style="mso-bidi-font-style: normal;">The Power of Learning Tool</em> to foster discussions among CSO actors on topics like mental health, donor relations, and challenging operational environments. The tool encourages engagement and reflection through user-friendly, interactive modules.'),
                'organization' => 'Dutch Ministry of Foreign Affairs (via Mannion Daniels)',
                'video_url' => 'https://www.youtube.com/live/bzs9HOJA6mc?si=sFomr-3YuglcdlPd',
                'image_urls' => 'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732262550/project_images/j0sqvqe51esltv478e8s.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732262556/project_images/k46o9wpswb671l29dnfd.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732262560/project_images/ihhubdrzty5ihcxlidrb.jpg',
                'category_ids' => '1,2,3',
                'created_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 21, 2024 09:09 PM'),
                'updated_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 21, 2024 09:09 PM'),
            ],
            [
                'id' => 2,
                'title' => 'Creation and Dissemination of Digital Content',
                'user_id' => 1,
                'description' => null,
                'file_path' => 'https://drive.google.com/file/d/1GGuS-ziGVmaYP2vF9cMTh-Gko1SjqIjk/view?usp=drive_link',
                'year' => '2022-01-22',
                'summary' => strip_tags('Oversaw the creation and dissemination of digital content addressing the intersection of AI, gender, and human rights. This included managing social media strategies and producing user-friendly materials to engage diverse audiences.'),
                'organization' => 'Pollicy',
                'video_url' => 'https://www.youtube.com/live/bzs9HOJA6mc?si=sFomr-3YuglcdlPd',
                'image_urls' => 'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732224086/project_images/yshzgrhzs8x7bjayakwi.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732224096/project_images/ia7fza8dhuau7pmpkvkv.jpg',
                'category_ids' => '1,2',
                'created_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 21, 2024 09:22 PM'),
                'updated_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 21, 2024 09:22 PM'),
            ],
            [
                'id' => 3,
                'title' => 'Tailored Sessions For Member Organizations',
                'user_id' => 1,
                'description' => strip_tags('Confidential Information: This document contains proprietary information. However, you can reach out to me for further inquiries.'),
                'file_path' => 'https://drive.google.com/file/d/1GGuS-ziGVmaYP2vF9cMTh-Gko1SjqIjk/view?usp=drive_link',
                'year' => '2024-11-22',
                'summary' => strip_tags('Conducted tailored training sessions for member organizations, focusing on digital safety, storytelling techniques, and strategic communication to enhance advocacy efforts and audience engagement.'),
                'organization' => 'Uganda Key Populations Consortium',
                'video_url' => 'https://www.youtube.com/live/bzs9HOJA6mc?si=sFomr-3YuglcdlPd',
                'image_urls' => 'https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732224356/project_images/srpi4betrsaollewj7nw.jpg,https://res.cloudinary.com/dxhb0gq8u/image/upload/v1732224363/project_images/jw0ipgq9urs3drljnlhh.jpg',
                'category_ids' => '5,6',
                'created_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 21, 2024 09:27 PM'),
                'updated_at' => Carbon::createFromFormat('M d, Y h:i A', 'Nov 21, 2024 09:27 PM'),
            ],
        ];

        DB::table('documents')->insert($documents);
    }
}
