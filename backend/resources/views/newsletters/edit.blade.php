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
                    <h2>Edit Newsletter</h2>
                </div>
                <div class="card-body">

                    @if (session('error'))
                        <div class="alert alert-danger">
                            <span> {{ session('error') }} </span>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('admin.newsletter.update', $newsletter->id) }}">
                        @csrf
                        @method('PUT') <!-- Use PUT for updating -->

                        <!-- Subject -->
                        <div class="form-group mb-3">
                            <label for="subject">Newsletter Subject</label>
                            <input type="text" name="subject" id="subject" class="form-control"
                                placeholder="Enter the newsletter subject"
                                value="{{ old('subject', $newsletter->subject) }}" required>
                            @error('subject')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Content -->
                        <div class="form-group">
                            <label for="content">Newsletter Content</label>
                            <textarea name="content" id="content" class="form-control" rows="5" placeholder="Write content here">{{ old('content', $newsletter->content) }}</textarea>
                            @error('content')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Attachments -->
                        <div class="form-group mb-3" id="attachments">
                            <label for="attachments[]">Attachment Links (Google Drive)</label>
                            @foreach (old('attachments', $newsletter->attachments ?? []) as $attachment)
                                <input type="url" name="attachments[]" class="form-control mb-2"
                                    placeholder="Enter Google Drive link" value="{{ $attachment }}">
                            @endforeach
                            <input type="url" name="attachments[]" class="form-control mb-2"
                                placeholder="Enter Google Drive link">
                            @error('attachments.*')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <button type="button" onclick="addAttachmentField()" class="btn btn-secondary mb-3">Add Another
                            Link</button>

                        <!-- Schedule Date (optional) -->
                        <div class="form-group mb-3">
                            <label for="scheduled_at">Schedule Date (optional)</label>
                            <input type="datetime-local" name="scheduled_at" id="scheduled_at" class="form-control"
                                value="{{ old('scheduled_at', optional($newsletter->scheduled_at)->format('Y-m-d\TH:i')) }}">
                        </div>

                        <div class="d-flex justify-content-between">
                            <a href="{{ route('admin.newsletter.view') }}" class="btn btn-secondary">Cancel</a>
                            <button type="submit" class="btn btn-primary">Update Newsletter</button>
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
        tinymce.init({
            selector: '#content',
            plugins: 'link image code',
            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code'
        });

        function addAttachmentField() {
            const div = document.createElement('div');
            div.classList.add('form-group', 'mb-2');
            div.innerHTML =
                '<input type="url" name="attachments[]" class="form-control" placeholder="Enter Google Drive link">';
            document.getElementById('attachments').appendChild(div);
        }
    </script>
@endsection
