@extends('layouts.dashboard.main')

<!--title section-->
@section('title')
    {{ $page_title }}
@endsection

<!--main content section-->
@section('content')
    @include('layouts.dashboard.common_nav')
    <div class="row mb-4">
        <div class="col-md-8">
            <h2>All Projects</h2>
            <!-- Display Success Message -->
            @if (session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif
        </div>
        <div class="col-md-4 text-right">
            <a href="{{ route('admin.document.create') }}" class="btn btn-primary">
                <i class="fas fa-plus-circle"></i> Add New Project
            </a>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Project Title</th>
                        <th>Organization</th>
                        <th>Year</th>
                        <th>Created By</th>
                        <th>Date Created</th>
                        <th>Summary</th>
                        <th>Video Url</th>
                        <th>File Path</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through documents here -->
                    @foreach ($documents as $document)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $document->title }}</td>
                            <td>{{ $document->organization ?? 'N/A' }}</td>
                            <td>{{ $document->year ?? 'N/A' }}</td>
                            <td>{{ $document->user->last_name ?? 'N/A' }}</td>
                            <td>{{ $document->created_at ? $document->created_at->format('d M Y') : 'N/A' }}</td>
                            <td>{!! $document->summary ?? '' !!}</td>
                            <td>
                                @if ($document->video_url)
                                    <a href="{{ $document->video_url }}" target="__blank">Video Url</a>
                                @else
                                    N/A
                                @endif
                            </td>
                            <td>
                                @if ($document->file_path)
                                    <a href="{{ $document->file_path }}" target="__blank">Google Doc Link</a>
                                @else
                                    N/A
                                @endif
                            </td>

                            <td>
                                @if ($document->status === 'active')
                                    <span class="badge badge-success">Active</span>
                                @else
                                    <span class="badge badge-secondary">Inactive</span>
                                @endif
                            </td>
                            <td>
                                <div class="d-flex gap-2">
                                    <a href="{{ route('admin.document.edit', $document->id) }}" class="btn btn-sm btn-warning">
                                        <i class="fas fa-edit"></i> Edit
                                    </a>
                                    <form action="{{ route('admin.document.destroy', $document->id) }}" method="POST" style="margin: 0;">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">
                                            <i class="fas fa-trash"></i> Delete
                                        </button>
                                    </form>
                                </div>
                            </td>
                            
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection

<!--scripts section-->
@section('scripts')
@endsection
