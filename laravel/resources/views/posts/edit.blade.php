@extends('layouts.app')
@section('content')
<div class="mx-auto max-w-3xl">
  <div class="max-w-2xl mx-auto card bg-base-100 shadow-lg rounded-2xl">
    <div class="card-body">
      <h2 class="card-title">Edit Post #{{ $post->id }}</h2>

      <form id="editForm" method="POST" action="{{ route('posts.update',$post) }}" class="space-y-4">
        @csrf @method('PUT')
        <label class="form-control">
          <span class="label-text mb-1">Title</span>
          <input name="title" class="input input-bordered w-full" value="{{ old('title',$post->title) }}">
        </label>
        <label class="form-control">
          <span class="label-text mb-1">Body</span>
          <textarea name="body" class="textarea textarea-bordered w-full h-56">{{ old('body',$post->body) }}</textarea>
        </label>
      </form>

      <div class="mt-3 card-actions flex-nowrap gap-2">
        <a href="{{ route('posts.show',$post) }}" class="btn">Back</a>
        <button form="editForm" class="btn btn-primary">Update</button>
        <form method="POST" action="{{ route('posts.destroy',$post) }}" class="contents">
          @csrf @method('DELETE')
          <button class="btn btn-error">Delete</button>
        </form>
      </div>
    </div>
  </div>
</div>
@endsection
