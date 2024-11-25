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
                    <h2>Update Blog Post</h2>
                </div>
                <div class="card-body">

                    @if (session('error'))
                        <div class="alert alert-danger">
                            <span> {{ session('error') }} </span>
                        </div>
                    @endif
                    @if (session('success'))
                        <div class="alert alert-success">
                            <span> {{ session('success') }} </span>
                        </div>
                    @endif


                    <form method="POST" action="{{ route('admin.blog.update', $blog->id) }}" enctype="multipart/form-data" id="addBlogForm">
                        @csrf
                        @method('PUT')
                        <!-- Title -->
                        <div class="form-group mb-3">
                            <label for="title">Blog Title</label>
                            <input type="text" name="title" id="title" class="form-control"
                                placeholder="Enter the blog title" value="{{ $blog->title }}">
                            @error('title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!--tags-->
                        <div class="form-group">
                            <label for="tags">Tags (comma-separated)</label>
                            <input type="text" class="form-control" id="tags"
                                value="{{ old('tags', implode(', ', json_decode($blog->tags, true) ?? [])) }}"
                                placeholder="e.g communication,mentorship" name="tags">
                            <small class="form-text text-muted">Enter tags separated by commas.</small>
                            @error('tags')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                         <!-- Excerpt -->
                        <div class="form-group mb-3">
                            <label for="excerpt">Excerpt</label>
                            <textarea name="excerpt" id="excerpt" class="form-control" rows="3"
                                placeholder="Short summary of the blog post">
                                {{ $blog->excerpt }}
                            </textarea>
                        </div>
                        <!-- Content -->
                        <div class="form-group">
                            <label for="description">Content</label>
                            <textarea name="content" id="content" class="form-control" rows="5" placeholder="Write blog content here">
                                {{ $blog->content }}
                            </textarea>
                            @error('content')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <!-- Status -->
                        <div class="form-group mb-3">
                            <label for="status">Status</label>
                            <select name="status" id="status" class="form-control">
                                <option value="draft" @if ($blog->status == 'draft') selected @endif>Draft</option>
                                <option value="published" @if ($blog->status == 'published') selected @endif>Published
                                </option>
                            </select>
                            @error('status')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Images -->
                        <div class="form-group mb-4">
                            <label for="image">Upload Blog Images</label>
                            <input type="file" name="images[]" id="images" class="form-control" multiple
                                accept="image/*">
                            <small class="form-text text-muted">You can upload multiple images.</small>
                            @error('image.*')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- Published At -->
                        {{-- <div class="form-group mb-3">
                                <label for="published_at">Publish Date</label>
                                <input type="datetime-local" name="published_at" id="published_at" class="form-control">
                            </div> --}}
                        <div>
                            @if ($blog->images->isNotEmpty())
                                <p class="form-text text-muted">Check any or all of the images should you wish to delete
                                    them during update.</p>
                            @endif

                        </div>
                        <div class="row">
                            @foreach ($blog->images as $image)
                                <div class='col-md-4'>
                                    <img src="{{ $image->image_path }}" alt="Blog Image"
                                        style="width: 100px; height: auto;">
                                    <label>
                                        <input type="checkbox" class='form-check' name="delete_images[]"
                                            value="{{ $image->image_path }}">
                                    </label>
                                </div>
                            @endforeach
                        </div>


                        <div class="d-flex justify-content-between">
                            <a href="{{ route('admin.blog.view') }}" class="btn btn-secondary">Cancel</a>
                            <button type="submit" class="btn btn-primary" id="addBlogBtn">
                                <span id="addBlogText">Update Blog</span>
                                <span class="spinner-border spinner-border-sm d-none" role="status" id="addBlogSpinner"
                                    aria-hidden="true"></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    @include('components.common')
    <script>
        $(document).ready(function () {
            //adding loading spinner 
            $('#addBlogForm').on('submit', function() {
                const $addBlogBtn = $('#addBlogBtn');
                const $addBlogText = $('#addBlogText');
                const $addBlogSpinner = $('#addBlogSpinner');
                // Disable button and show spinner
                $addBlogBtn.prop('disabled', true);
                $addBlogText.addClass('d-none');
                $addBlogSpinner.removeClass('d-none');
            }); 
        });
    </script>
@endsection
