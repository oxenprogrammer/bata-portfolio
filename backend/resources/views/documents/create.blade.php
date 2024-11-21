@extends('layouts.dashboard.main')
<!--title section-->
@section('title')
    {{ $page_title }}
@endsection
<!--main content section-->
@section('content')
    <div class="row justify-content-center">
        <div class="col-md-8 ">
            <div class="card">
                <div class="card-header">
                    <h2>Add New Project</h2>
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
                    <form method="POST" action="{{ route('admin.document.store') }}">
                        @csrf
                        <div class="form-group">
                            <label for="title">Project Title</label>
                            <input type="text" name="title" id="title" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Project Summary</label>
                            <textarea name="description" id="summary" class="form-control" rows="5"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="description">Main Content</label>
                            <textarea name="description" id="description" class="form-control" rows="10"></textarea>
                        </div>
                        <div class="row">
                            <div class='form-group col-md-6'>
                                <label for="file_type">Organization</label>
                                <input type="text" name="organization" id="organization" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="file_size">Date</label>
                                <input type="date" name="year" id="year" class="form-control">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12 d-flex align-items-end">
                                <div class="flex-grow-1">
                                    <label for="file_type">Project Category</label>
                                    <select class="form-control" name="category" id="category">
                                        <option value="" selected disabled>Select Category</option>
                                        <!-- Categories will be dynamically loaded here -->
                                    </select>
                                </div>
                                <button type="button" class="btn btn-primary ml-2" id="add-category-btn">
                                    Add New
                                </button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="file_path">Google Drive Document Link</label>
                            <input type="url" name="file_path" id="file_path" class="form-control">
                            <small class="form-text text-muted">Enter the Google Drive link to the project document if
                                any.</small>
                        </div>
                        <div class="form-group">
                            <label for="file_path">Video Link</label>
                            <input type="url" name="video_link" id="video_link" class="form-control">
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
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div class="d-flex justify-content-between">
                            <a href="{{ route('admin.document.view') }}" class="btn btn-secondary">Cancel</a>
                            <button type="submit" class="btn btn-primary">Add Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @include('documents.category_modal')
@endsection
<!--scripts section-->
@section('scripts')
    @include('components.common')
    <script>
        $(document).ready(function() {
            // Fetch categories on page load
            getCategories();
            // Function to load categories dynamically
            function getCategories() {
                $.ajax({
                    type: "get",
                    url: "/admin/categories/get",
                    dataType: "json",
                    success: function(response) {
                        if (response.success) {
                            const $categoryDropdown = $('#category');
                            $categoryDropdown.empty(); 
                            $categoryDropdown.append('<option value="" disabled selected>Select Category</option>');
    
                            $.each(response.data, function(index, category) {
                                $categoryDropdown.append(`<option value="${category.id}">${category.name}</option>`);
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
                alert('HI')
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
        });
    </script>
@endsection
