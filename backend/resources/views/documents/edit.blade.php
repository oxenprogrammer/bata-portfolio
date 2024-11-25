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
                        enctype="multipart/form-data" id="updateProjectForm">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label for="title">Project Title</label>
                            <input type="text" name="title" id="title" class="form-control"
                                value="{{ old('title', $document->title) }}" required>
                        </div>
                        <div class="form-group">
                            <label for="summary">Project Summary</label>
                            <textarea name="summary" id="summary" class="form-control" rows="5">{{ old('summary',$document->summary) }}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea name="description" id="description" class="form-control" rows="10">{{ old('description',$document->description) }}</textarea>
                        </div>
                        <div class="row">
                            <div class='form-group col-md-6'>
                                <label for="file_type">Organization</label>
                                <input type="text" name="organization" id="organization" class="form-control"
                                    value="{{ old('organization',$document->organization) }}">
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

                        @if (!empty($document->image_urls))
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
                            <button type="submit" class="btn btn-primary" id='updateProjectBtn'><span
                                    id="addProjectText">Update Project</span>
                                <span class="spinner-border spinner-border-sm d-none" role="status"
                                    id="addProjectSpinner" aria-hidden="true"></span></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @php
        $categoryIds = explode(',', $document->category_ids);
    @endphp
    @include('documents.category_modal')
@endsection
<!--scripts section-->
@section('scripts')
@include('components.alert')
    <script>
        $(document).ready(function() {
            tinymce.init({
                selector: '#description',
                plugins: 'lists link image',
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
                height: 300 // Adjust height as needed
            });

            $('#categories').select2({
                placeholder: "Select a Category",
                allowClear: true,
            });

            // Fetch categories on page load
            getCategories();
            // Function to load categories dynamically
            function getCategories() {
                var categoryIds = @json($categoryIds);
                $.ajax({
                    type: "get",
                    url: "/admin/categories/get",
                    dataType: "json",
                    success: function(response) {
                        if (response.success) {
                            const $categoryDropdown = $('#categories');
                            $categoryDropdown.empty();
                            $.each(response.data, function(index, category) {
                                var isSelected = categoryIds.includes(category.id
                                    .toString());
                                $categoryDropdown.append(
                                    `<option value="${category.id}" ${isSelected ? 'selected' : ''}>${category.name}</option>`
                                );
                            });
                        }
                    },
                    error: function(xhr) {
                        alert('Failed to load categories. Please try again.');
                    }
                });
            }
            // Show the Add Category modal when button is clicked
            $(document).on('click', '#add-category-btn', function() {
                $('#addCategory').modal('show');
            });

            // Handle Add Category form submission
            $(document).on('submit', '#categoryForm', function(e) {
                e.preventDefault(); // Prevent default form submission
                const $nameField = $('#name');

                if (!$nameField.val().trim()) {
                    alert('Category Name is required');
                    return;
                }

                $.ajax({
                    type: "post",
                    url: "/admin/categories/store",
                    data: $(this).serialize(),
                    success: function(response) {
                        if (response.success) {
                            getCategories();
                            $('#addCategory').modal('hide');
                            $('#categoryForm')[0].reset();
                            alert('Category added successfully!');
                        } else {
                            alert('Failed to add category. Please try again.');
                        }
                    },
                    error: function(xhr) {
                        alert(`Error: ${xhr.responseJSON.message || 'Something went wrong!'}`);
                    }
                });
            });

            //adding loading spinner 
            $('#updateProjectForm').on('submit', function() {
                const $addProjectBtn = $('#updateProjectBtn');
                const $addProjectText = $('#addProjectText');
                const $addProjectSpinner = $('#addProjectSpinner');

                // Disable button and show spinner
                $addProjectBtn.prop('disabled', true);
                $addProjectText.addClass('d-none');
                $addProjectSpinner.removeClass('d-none');
            });
        });
    </script>
@endsection
