@extends('layouts.app')

@section('content')
    <div class="row justify-content-center">
        <div class="col-md-8 ">
            <div class="card">
                <div class="card-header">
                    <h2>Update File</h2>
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route('admin.document.update', $document->id) }}">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label for="title">Document Title</label>
                            <input type="text" name="title" id="title" class="form-control"
                                value="{{ old('title', $document->title) }}" required>
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea name="description" id="description" class="form-control" rows="5">{{ old('description', $document->description) }}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="file_type">File Type</label>
                            <input type="text" name="file_type" id="file_type" class="form-control"
                                value="{{ old('file_type', $document->file_type) }}">
                        </div>

                        <div class="form-group">
                            <label for="status">Status</label>
                            <select name="status" id="status" class="form-control">
                                <option value="active" {{ $document->status === 'active' ? 'selected' : '' }}>Active
                                </option>
                                <option value="inactive" {{ $document->status === 'inactive' ? 'selected' : '' }}>Inactive
                                </option>
                            </select>
                        </div>
                        <div class="d-flex justify-content-between">
                            <a href="{{ route('admin.document.view') }}" class="btn btn-secondary">Cancel</a>
                            <button type="submit" class="btn btn-primary">Update Document</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
<!--scripts section-->
@section('scripts')
    <script>
        $(document).ready(function() {
            tinymce.init({
                selector: '#description',
                plugins: 'lists link image',
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
                height: 300 // Adjust height as needed
            });
        });
    </script>
@endsection
