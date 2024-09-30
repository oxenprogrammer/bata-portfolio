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
                    <h2>Add New File</h2>
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
                            <label for="title">Document Title</label>
                            <input type="text" name="title" id="title" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea name="description" id="description" class="form-control" rows="5"></textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="file_size">File Size (in bytes)</label>
                                <input type="number" name="file_size" id="file_size" class="form-control">
                            </div>

                            <div class="form-group col-md-6">
                                <label for="file_type">File Type</label>
                                <input type="text" name="file_type" id="file_type" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="file_path">Google Drive Document Link</label>
                            <input type="url" name="file_path" id="file_path" class="form-control" required>
                            <small class="form-text text-muted">Enter the Google Drive link to the document.</small>
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
                        <button type="submit" class="btn btn-primary">Add Document</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    @endsection
    <!--scripts section-->
    @section('scripts')
        @include('components.common')
    @endsection
