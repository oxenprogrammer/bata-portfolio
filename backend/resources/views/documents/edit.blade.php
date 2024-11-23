@extends('layouts.app')

@section('content')
    <div class="row justify-content-center">
        <div class="col-md-8 ">
            <div class="card">
                <div class="card-header">
                    <h2>Update Project</h2>
                </div>
                <div class="card-body">

                    <!-- Display Validation Errors -->
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <form method="POST" action="{{ route('admin.document.update', $document->id) }}"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label for="title">Project Title</label>
                            <input type="text" name="title" id="title" class="form-control"
                                value="{{ old('title'), $document->title }}" required>
                        </div>
                        <div class="form-group">
                            <label for="summary">Project Summary</label>
                            <textarea name="summary" id="summary" class="form-control" rows="5">{{ old('summary') }}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea name="description" id="description" class="form-control" rows="10">{{ old('description') }}</textarea>
                        </div>
                        <div class="row">
                            <div class='form-group col-md-6'>
                                <label for="file_type">Organization</label>
                                <input type="text" name="organization" id="organization" class="form-control"
                                    value="{{ old('organization') }}">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="file_size">Date</label>
                                <input type="date" name="year" id="year" class="form-control"
                                    value="{{ old('year', $document->year) }}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-10">
                                <label for="file_type">Project Category</label>
                                <select class="form-control" name="categories[]" id="categories" multiple>
                                    <option value="" selected disabled>Select Category</option>
                                    <!-- Categories will be dynamically loaded here -->
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <button type="button" class="btn btn-primary btn-sm mt-4" id="add-category-btn">
                                    Add New
                                </button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="file_path">Google Drive Document Link</label>
                            <input type="url" name="file_path" id="file_path" class="form-control"
                                value="{{ old('file_path', $document->file_path) }}">
                            <small class="form-text text-muted">Enter the Google Drive link to the project document if
                                any.</small>
                        </div>
                        <div class="form-group">
                            <label for="file_path">Video Link</label>
                            <input type="url" name="video_url" id="video_url" class="form-control"
                                value="{{ old('video_link', $document->video_url) }}">
                            <small class="form-text text-muted">Enter the Video Link if any.</small>
                        </div>

                        <div class="form-group mb-4">
                            <label for="image">Upload Project Images</label>
                            <input type="file" name="images[]" id="images" class="form-control" multiple
                                accept="image/*">
                            <small class="form-text text-muted">You can upload multiple images.</small>
                            @error('image.*')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="status">Status</label>
                            <select name="status" id="status" class="form-control">
                                <option value="active" {{ old('status') == 'active' ? 'selected' : '' }}>Active</option>
                                <option value="inactive" {{ old('status') == 'inactive' ? 'selected' : '' }}>Inactive
                                </option>
                            </select>
                        </div>
                        @if ($document->image_urls->isNotEmpty())
                            @php
                                $image_urls = explode(',', $document->image_urls);
                            @endphp
                            <div>
                                <p class="form-text text-muted">Check any or all of the images should you wish to delete
                                    them during update.</p>
                            </div>
                            <div class="row">
                                @foreach ($image_urls as $image)
                                    <div class='col-md-4'>
                                        <img src="{{ $image }}" alt="Project Image"
                                            style="width: 100px; height: auto;">
                                        <label>
                                            <input type="checkbox" class='form-check' name="delete_images[]"
                                                value="{{ $image }}">
                                        </label>
                                    </div>
                                @endforeach
                            </div>
                        @endif
                        <div class="d-flex justify-content-between">
                            <a href="{{ route('admin.document.view') }}" class="btn btn-secondary">Cancel</a>
                            <button type="submit" class="btn btn-primary">Update Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
<!--scripts section-->
@section('scripts')
    <script>
        $(document).ready(function() {
            tinymce.init({
                selector: '#description',
                plugins: 'lists link image',
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
                height: 300 // Adjust height as needed
            });
        });
    </script>
@endsection
