<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'created_by' => $this->user->first_name . ' ' . $this->user->last_name,
            'tags' => json_decode($this->tags, true),
            'images' => $this->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'url' => $image->image_path,
                ];
            }),
            'published_at' => $this->created_at->format('M d, Y h:i A'),
            'updated_at' => $this->updated_at->format('M d, Y h:i A'),
        ];
    }
}
