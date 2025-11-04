@extends('layouts.app')
@section('content')
<div class="mx-auto max-w-3xl">
  <div class="breadcrumbs text-sm mb-3">
    <ul>
      <li><a href="{{ route('posts.index') }}">Posts</a></li>
      <li>#{{ $post->id }}</li>
    </ul>
  </div>

  <div class="card bg-base-100 shadow-lg rounded-2xl">
    <div class="card-body">
      <h1 class="text-3xl font-semibold">
        <span class="badge badge-neutral badge-outline mr-2">#{{ $post->id }}</span>
        {{ $post->title }}
      </h1>
      <p class="opacity-70 text-sm">by {{ $post->user->name }}</p>
      <div class="divider my-4"></div>
      <div class="prose max-w-none whitespace-pre-wrap">{{ $post->body }}</div>

      <div class="mt-6">
        <div class="card-actions flex-nowrap gap-2">
          <a class="btn" href="{{ route('posts.index') }}">Back</a>
          @auth
            @if ($post->user_id === auth()->id())
              <a class="btn btn-outline" href="{{ route('posts.edit',$post) }}">Edit</a>
              <form method="POST" action="{{ route('posts.destroy',$post) }}" class="contents">
                @csrf @method('DELETE')
                <button class="btn btn-error">Delete</button>
              </form>
            @endif
          @endauth
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
