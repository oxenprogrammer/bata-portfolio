@extends('layouts.dashboard.main')
<!--title section-->
@section('title')
    {{ $page_title }}
@endsection
@section('css')
    <style>
        /* Optional additional styling for a polished look */
        #calendar {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        .fc-toolbar-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #007bff;
        }

        .fc-button {
            border: none;
            background-color: #007bff;
            color: white;
        }

        .fc-button:hover {
            background-color: #0056b3;
        }
    </style>
@endsection
<!--main content section-->
@section('content')
    <div class="az-dashboard-nav">
        <nav class="nav">
            <a class="nav-link active" href="{{ route('admin.dashboard') }}">Dashboard</a>
            <a class="nav-link" href="{{ route('admin.document.view') }}">Documents</a>
            <a class="nav-link" href="{{ route('admin.blog.view') }}">Blog</a>
            {{-- <a class="nav-link"  href="{{ route('admin.user.view') }}">Users</a> --}}
            <a class="nav-link" href="{{ route('admin.subscriber.view') }}">Subscribers</a>
            <a class="nav-link" href="{{ route('admin.contact.view') }}">Contacts</a>
            <a class="nav-link" href="{{ route('admin.newsletter.view') }}">Newsletter</a>
            <a class="nav-link" data-toggle="tab" href="#">More</a>
        </nav>
    </div>
    <div class="row row-sm">
        <div class="col-md-12 col-lg-12 col-xl-12">
            <div id="calendar"></div>
        </div>
    </div>
@endsection

@section('scripts')
    <!-- FullCalendar CSS -->
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.0/main.min.css" rel="stylesheet">

    <!-- FullCalendar JS -->
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.0/main.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                initialDate: new Date(),
                themeSystem: 'bootstrap', 
                selectable: false,
                dayMaxEvents: false, 
            });

            calendar.render();
        });
    </script>
@endsection
