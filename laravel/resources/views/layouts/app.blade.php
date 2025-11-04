<!doctype html>
<html data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
  <title>{{ $title ?? 'Posts' }}</title>
</head>
<body class="min-h-screen bg-base-200">
  <header class="sticky top-0 z-20 backdrop-blur bg-base-100/80 border-b">
    <div class="navbar container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
      <div class="flex-1">
        <a href="{{ route('posts.index') }}" class="btn btn-ghost text-xl">Posts</a>
      </div>
      <div class="flex-none gap-2">
        @auth
          <a href="{{ route('posts.create') }}" class="btn btn-primary">New Post</a>
          <form method="POST" action="{{ route('logout.perform') }}">
            @csrf
            <button class="btn btn-ghost">Sign Out</button>
          </form>
        @endauth
        @guest
          <a href="{{ route('login.show') }}" class="btn btn-ghost">Sign In</a>
          <a href="{{ route('register.show') }}" class="btn btn-primary">Sign Up</a>
        @endguest
      </div>
    </div>
  </header>

  <main class="container mx-auto px-4 md:px-6 lg:px-8 py-8 max-w-6xl">
    @if (session('status'))
      <div class="alert alert-success mb-4">{{ session('status') }}</div>
    @endif
    @if ($errors->any())
      <div class="alert alert-error mb-4">
        <ul class="list-disc ml-6">
          @foreach ($errors->all() as $e)
            <li>{{ $e }}</li>
          @endforeach
        </ul>
      </div>
    @endif
    @yield('content')
  </main>
</body>
</html>
