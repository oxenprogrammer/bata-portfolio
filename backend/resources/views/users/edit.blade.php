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
                    <h2>Update User</h2>
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
                    <form action="{{ route('admin.user.update', $user->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                
                        <div class="mb-3">
                            <label for="first_name" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="first_name" name="first_name" value="{{ old('first_name', $user->first_name) }}" required>
                        </div>
                
                        <div class="mb-3">
                            <label for="last_name" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="last_name" name="last_name" value="{{ old('last_name', $user->last_name) }}" required>
                        </div>
                
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" value="{{ old('email', $user->email) }}" required>
                        </div>
                
                        <div class="mb-3">
                            <label for="biography" class="form-label">Biography</label>
                            <textarea class="form-control" id="biography" name="biography" rows="3">{{ old('biography', $user->biography) }}</textarea>
                        </div>
                
                        <div class="mb-3">
                            <label for="skills" class="form-label">Skills (comma separated)</label>
                            <input type="text" class="form-control" id="skills" name="skills" value="{{ old('skills', implode(', ', json_decode($user->skills, true) ?? [])) }}">
                        </div>
                
                        <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" id="is_admin" name="is_admin" value="1" {{ $user->admin ? 'checked' : '' }}>
                            <label class="form-check-label" for="is_admin">Is Admin?</label>
                        </div>
                        <a href="{{ route('admin.user.view') }}" class="btn btn-secondary">Cancel</a>
                        <button type="submit" class="btn btn-primary">Update User</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @endsection
    <!--scripts section-->
    @section('scripts')
        @include('components.common')
    @endsection
