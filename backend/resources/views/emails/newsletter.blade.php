<x-mail::message>
# {{ $subject }}

{!! $content !!}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
