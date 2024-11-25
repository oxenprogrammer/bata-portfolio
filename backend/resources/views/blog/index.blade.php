@extends('layouts.dashboard.main')

<!-- Title section -->
@section('title')
    {{ $page_title }}
@endsection

<!-- Main content section -->
@section('content')
@include('layouts.dashboard.common_nav')
<div class="row mb-4">
    <div class="col-md-8">
        <h2>All Posts</h2>
        <!-- Display Success Message -->
        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
    </div>
    <div class="col-md-4 text-right">
        <a href="{{ route('admin.blog.create') }}" class="btn btn-primary">
            <i class="fas fa-plus-circle"></i> Add New Post
        </a>
    </div>
</div>

<!-- Blog Posts Table -->
<div class="row">
    <div class="col-md-12">
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Excerpt</th>
                        <th>Status</th>
                        <th>Author</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($blogs as $blog)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $blog->title }}</td>
                            <td>{!! $blog->excerpt ?? 'No excerpt available' !!}</td>
                            <td>
                                <span class="badge badge-{{ $blog->status === 'published' ? 'success' : 'secondary' }}">
                                    {{ ucfirst($blog->status) }}
                                </span>
                            </td>
                            <td>{{ $blog->user->name ?? 'Unknown' }}</td>
                            <td>{{ $blog->created_at->format('M d, Y h:i A') }}</td>
                            <td class="d-flex justify-content-center">
                                <a href="{{ route('admin.blog.edit', $blog->id) }}" class="btn btn-sm btn-warning me-2">
                                    <i class="fas fa-edit"></i> Edit
                                </a>
                                <form action="{{ route('admin.blog.destroy', $blog->id) }}" method="POST" class="d-inline-block" onsubmit="return confirm('Are you sure you want to delete this post?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger">
                                        <i class="fas fa-trash"></i> Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<!-- Include any additional scripts here -->
@include('components.alert')
@endsection
