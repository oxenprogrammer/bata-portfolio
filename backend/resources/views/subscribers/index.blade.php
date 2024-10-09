@extends('layouts.dashboard.main')

<!--title section-->
@section('title')
    {{ $page_title }}
@endsection

<!--main content section-->
@section('content')
    <div class="row mb-4">
        <div class="col-md-8">
            <h2>All Subscribers</h2>
            <!-- Display Success Message -->
            @if (session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif
        </div>
        <div class="col-md-4 text-right">
            <a href="#" class="btn btn-primary" id='add_subscriber'>
                <i class="fas fa-plus-circle"></i> Add New Subscriber
            </a>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Email Address</th>
                        <th>Date Subscribed</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through subscribers here -->
                    @foreach ($subscribers as $subscriber)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $subscriber->email }}</td>
                            <td>{{ $subscriber->created_at->format('d M Y') }}</td>
                            <td>
                                @if ($subscriber->status === 'active')
                                    <span class="badge badge-success">Active</span>
                                @elseif($subscriber->status === 'pending')
                                    <span class="badge badge-success">Pending</span>
                                @elseif($subscriber->status === 'unsubscribed')
                                    <span class="badge badge-danger">Unsubscribed</span>
                                @else
                                    <span class="badge badge-secondary">Inactive</span>
                                @endif
                            </td>
                            <td>
                                <a href="{{ route('admin.subscriber.edit', $subscriber->id) }}"
                                    class="btn btn-sm btn-warning">
                                    <i class="fas fa-edit"></i> Edit
                                </a>
                                <form action="{{ route('admin.subscriber.destroy', $subscriber->id) }}" method="POST"
                                    style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger"
                                        onclick="return confirm('Are you sure?')">
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
    <!--Manual Addition of Subscriber Model-->
    @include('subscribers.create')
@endsection

<!--scripts section-->
@section('scripts')
    <script>
        $(document).ready(function() {
            $(document).on('click', '#add_subscriber', function(event) {
                event.preventDefault()
                $("#addSubscriber").modal('show');
                $('#subscriberAdd').on('click', function(event) {
                    event.preventDefault();
                    var csrfToken = $('meta[name="csrf-token"]').attr('content');
                    $.ajax({
                        url: '{{ route('admin.subscriber.store') }}',
                        type: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': csrfToken
                        },
                        data: $("#subscriberForm").serialize(),
                        success: function(response) {
                            $('#subscriberForm')[0].reset();
                            $("#addSubscriber").modal('hide');
                            location.reload(true);
                        },
                        error: function(xhr) {
                            if (xhr.status === 422) {
                                const errors = xhr.responseJSON.errors
                                $.each(errors,function(field,messages){
                                    $(`#${field}`).after(`<span class='text-danger'>${messages[0]}</span>`)
                                })

                                setTimeout(() => {
                                    location.reload()
                                }, 5000);

                                return;
                            }
                            $('#errors').append(`<span class='text-danger'> Unexpected error!</span>`)
                        }
                    });
                })
            });
        });
    </script>
@endsection
