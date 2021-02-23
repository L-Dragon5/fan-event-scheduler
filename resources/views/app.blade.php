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
        @if (config('app.adsense_client') !== '')
        <script data-ad-client="{{ config('app.adsense_client') }}" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        @endif

        @if (config('app.analytics_id') !== '')
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('app.analytics_id') }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', "{{ config('app.analytics_id') }}");
        </script>
        @endif
    @endproduction

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">
</head>
<body>
@inertia
</body>
</html>