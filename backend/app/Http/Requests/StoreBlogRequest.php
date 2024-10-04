<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'image' => 'nullable|array',
            'image.*' => 'file|image|max:2048', // Validate each image (up to 2MB)
            'published_at' => 'nullable|date',
        ];
    }
    /**
     * Get custom error messages for validation messages
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The blog title is required.',
            'content.required' => 'The blog content is required.',
            'image.*.image' => 'Each file must be a valid image.',
            'image.*.max' => 'Each image should not exceed 2MB in size.',
        ];
    }
}
