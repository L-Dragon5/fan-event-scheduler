<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>
        @if ($title !== '' && isset($schedule_name))
            {{ $title }} | {{ $schedule_name }}
        @elseif ($title !== '')
            {{ $title }} | {{ config('app.name', 'Laravel') }}
        @else
            {{ config('app.name', 'Laravel') }}
        @endif
    </title>

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}" defer></script>

    @if(Route::is('register'))
    <script src="https://www.google.com/recaptcha/api.js" defer></script>
    @endif

    @production
        <script data-ad-client="{{ config('app.adsense_client') }}" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    @endproduction

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">
</head>
<body>
@inertia
</body>
</html>