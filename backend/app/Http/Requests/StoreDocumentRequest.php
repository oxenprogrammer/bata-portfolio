<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
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
            'description' => 'nullable|string',
            'file_path' => 'required|url',
            'file_type' => 'nullable|string|max:50',
            'status' => 'required|in:active,inactive',
        ];
    }
    public function messages()
    {
        return [
            'title.required' => 'Document title is required.',
            'file_path.required' => 'Google Drive document link is required.',
            'file_path.url' => 'Please provide a valid URL for the document link.',
        ];
    }
}
