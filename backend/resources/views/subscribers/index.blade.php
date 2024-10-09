@extends('layouts.dashboard.main')

<!--title section-->
@section('title')
    {{$page_title}}
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
        <a href="{{ route('admin.subscriber.create') }}" class="btn btn-primary">
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
                @foreach($subscribers as $document)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $subscriber->email}}</td>
                    <td>{{ $subscriber->created_at->format('d M Y') }}</td>
                    <td>
                        @if($subscriber->status === 'active')
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
                        <a href="{{ route('admin.subscriber.edit', $subscriber->id) }}" class="btn btn-sm btn-warning">
                            <i class="fas fa-edit"></i> Edit
                        </a>
                        <form action="{{ route('admin.subscriber.destroy', $subscriber->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">
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
@endsection

<!--scripts section-->
@section('scripts')

@endsection
