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
            <h2>Mentorship</h2>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($mentorship as $ment)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>{{ $ment->name }}</td>
                                <td>{{ $ment->email }}</td>
                                <td>{{ $ment->subject }}</td>
                                <td>{{ $ment->created_at->format('M d, Y h:i A') }}</td>
                                <td class="d-flex justify-content-center">
                                    <form action="{{ route('admin.mentorship.destroy', $ment->id) }}" method="POST"
                                        class="d-inline-block"
                                        onsubmit="return confirm('Are you sure you want to delete this info?');">
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
