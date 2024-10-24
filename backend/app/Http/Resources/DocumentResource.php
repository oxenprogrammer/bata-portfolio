<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
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
            'description' => $this->description,
            'url' => $this->file_path, // Change this according to your document's URL field
            'created_at' => $this->created_at->format('M d, Y h:i A'), // Format to human-readable date
            'updated_at' => $this->updated_at->format('M d, Y h:i A'), // Format to human-readable date
        ];
    }
}
