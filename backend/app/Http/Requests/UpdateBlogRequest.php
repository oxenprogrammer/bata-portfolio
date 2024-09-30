<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255', // Blog title must be present
            'content' => 'required|string', // Blog content must be present
            'excerpt' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate images (if provided)
            'delete_images' => 'array|nullable', // Accept an array for deleted images (can be null)
            'delete_images.*' => 'string|url', // Each image URL to be deleted must be a string and a valid URL
        ];
    }
}
