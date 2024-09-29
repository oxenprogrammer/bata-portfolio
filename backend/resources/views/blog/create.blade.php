@extends('layouts.dashboard.main')
<!--title section-->
@section('title')
    {{ $page_title }}
@endsection
<!--main content section-->
@section('content')
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h2>Add Blog Post</h2>
                    </div>
                    <div class="card-body">
                        <form method="POST" action="{{ route('admin.blog.store') }}" enctype="multipart/form-data">
                            @csrf
                            <!-- Title -->
                            <div class="form-group mb-3">
                                <label for="title">Blog Title</label>
                                <input type="text" name="title" id="title" class="form-control"
                                    placeholder="Enter the blog title" required>
                            </div>

                            <!-- Content -->
                            <div class="form-group mb-3">
                                <label for="content">Content</label>
                                <textarea name="content" id="content" class="form-control" rows="6"
                                    placeholder="Write your blog content here..." required></textarea>
                            </div>

                            <!-- Excerpt -->
                            <div class="form-group mb-3">
                                <label for="excerpt">Excerpt</label>
                                <textarea name="excerpt" id="excerpt" class="form-control" rows="3"
                                    placeholder="Short summary of the blog post"></textarea>
                            </div>

                            <!-- Status -->
                            <div class="form-group mb-3">
                                <label for="status">Status</label>
                                <select name="status" id="status" class="form-control">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <!-- Images -->
                            <div class="form-group mb-4">
                                <label for="image">Upload Blog Images</label>
                                <input type="file" name="image[]" id="image" class="form-control" multiple
                                    accept="image/*">
                                <small class="form-text text-muted">You can upload multiple images.</small>
                            </div>

                            <!-- Published At -->
                            {{-- <div class="form-group mb-3">
                                <label for="published_at">Publish Date</label>
                                <input type="datetime-local" name="published_at" id="published_at" class="form-control">
                            </div> --}}

                            <div class="d-flex justify-content-between">
                                <a href="{{ route('admin.blog.view') }}" class="btn btn-secondary">Cancel</a>
                                <button type="submit" class="btn btn-primary">Add Blog Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
@endsection
@section('scripts')
@include('components.common')
@endsection
