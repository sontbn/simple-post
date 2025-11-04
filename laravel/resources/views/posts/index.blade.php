@extends('layouts.app')
@section('content')
<h1 class="text-3xl font-semibold mb-4">Posts</h1>

<div class="mx-auto max-w-3xl">
  <div class="grid gap-4">
    @forelse ($posts as $p)
    <div class="card bg-base-100 shadow-lg rounded-2xl hover:shadow-xl transition">
      <div class="card-body">
        <div class="flex items-start justify-between gap-3">
          <h2 class="card-title">
            <span class="badge badge-neutral badge-outline mr-2">#{{ $p->id }}</span>
            <a href="{{ route('posts.show',$p) }}" class="link link-hover">{{ $p->title }}</a>
          </h2>
          @auth
            @if ($p->user_id === auth()->id())
              <a class="btn btn-sm btn-outline" href="{{ route('posts.edit',$p) }}">Edit</a>
            @endif
          @endauth
        </div>
        <p class="text-sm opacity-70">by {{ $p->user->name }}</p>
        <div class="card-actions justify-end">
          <a class="btn btn-primary" href="{{ route('posts.show',$p) }}">Open</a>
        </div>
      </div>
    </div>
    @empty
      <div class="text-center opacity-70">No posts</div>
    @endforelse
  </div>

  <div class="mt-6 flex justify-center">
    {{ $posts->onEachSide(1)->links('vendor.pagination.daisy-modern') }}
  </div>
</div>
@endsection
