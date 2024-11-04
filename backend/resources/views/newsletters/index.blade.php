@extends('layouts.dashboard.main')

<!-- Title section -->
@section('title')
    {{ $page_title }}
@endsection

<!-- Main content section -->
@section('content')
<div class="row mb-4">
    <div class="col-md-8">
        <h2>All Newsletters</h2>
        <!-- Display Success Message -->
        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
        @if (session('error'))
        <div class="alert alert-danger">
            <span> {{ session('error') }} </span>
        </div>
    @endif
    </div>
    <div class="col-md-4 text-right">
        <a href="{{ route('admin.newsletter.create') }}" class="btn btn-primary">
            <i class="fas fa-plus-circle"></i> Add New Newsletter
        </a>
    </div>
</div>

<!-- Newsletters Table -->
<div class="row">
    <div class="col-md-12">
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Subject</th>
                        <th>Excerpt</th>
                        <th>Sent Status</th>
                        <th>Created At</th>
                        <th>Scheduled For</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($newsletters as $newsletter)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $newsletter->subject }}</td>
                            <td>{!! Str::limit($newsletter->content, 50)!!}</td>
                            <td>
                                @if($newsletter->is_sent)
                                    <span class="badge badge-success">
                                        <i class="fas fa-check"></i> Sent
                                    </span>
                                @else
                                    <span class="badge badge-secondary">Pending</span>
                                @endif
                            </td>
                            <td>{{ $newsletter->created_at->format('M d, Y h:i A') }}</td>
                            <td>{{ $newsletter->scheduled_at ? $newsletter->scheduled_at->format('M d, Y h:i A') : 'Not Scheduled' }}</td>
                            <td class="d-flex justify-content-center">
                                @if(!$newsletter->is_sent)
                                <a href="{{ route('admin.newsletter.edit', $newsletter->id) }}" class="btn btn-sm btn-warning me-2">
                                    <i class="fas fa-edit"></i> Edit
                                </a>
                                @endif
                                @if(!$newsletter->is_sent)
                                    <form action="{{ route('admin.newsletter.send', $newsletter->id) }}" method="POST" class="d-inline-block">
                                        @csrf
                                        <button type="submit" class="btn btn-sm btn-primary">
                                            <i class="fas fa-paper-plane"></i> Send
                                        </button>
                                    </form>
                                @endif
                                    <form action="{{ route('admin.newsletter.destroy', $newsletter->id) }}" method="POST" class="d-inline-block">
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
@endsection
