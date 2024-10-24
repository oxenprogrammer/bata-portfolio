@extends('layouts.dashboard.main')

<!--title section-->
@section('title')
    {{ $page_title }}
@endsection

<!--main content section-->
@section('content')
    <div class="row mb-4">
        <div class="col-md-8">
            <h2>All Users</h2>
            <!-- Display Success Message -->
            @if (session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif
        </div>
        <div class="col-md-4 text-right">
            <a href="{{ route('admin.user.create') }}" class="btn btn-primary">
                <i class="fas fa-plus-circle"></i> Add New User
            </a>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 table-responsive" >
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Biography</th>
                        <th>Skills</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through documents here -->
                    @foreach ($users as $user)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ ucwords($user->first_name . ' ' . $user->last_name) }}</td>
                            <td>{{ $user->email }}</td>
                            <td>{!! $user->biography !!}</td>
                            <td>{{ $user->skills }}</td>
                            <td>
    
                                <a href="{{ route('admin.user.edit', $user->id) }}" class="btn btn-sm btn-warning">
                                    <i class="fas fa-edit"></i> Edit
                                </a>
                                @if (Auth::user()->admin && $user->id !== Auth::user()->id)
                                    <form action="{{ route('admin.user.destroy', $user->id) }}" method="POST"
                                        style="display:inline;">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-danger"
                                            onclick="return confirm('Are you sure?')">
                                            <i class="fas fa-trash"></i> Delete
                                        </button>
                                    </form>
                                @endif
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
