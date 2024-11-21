<x-mail::message>
# {{ $subject }}

{!! $content !!}
If you no longer wish to receive these emails, click the button below to unsubscribe.
<x-mail::button :url="url('/api/unsubscribe/' . $token)" color="red">
    Unsubscribe
</x-mail::button>
Thanks<br>
{{ config('app.name') }}
</x-mail::message>
