@extends('layouts.app')
@section('content')
<div class="mx-auto max-w-3xl">
  <div class="max-w-2xl mx-auto card bg-base-100 shadow-lg rounded-2xl">
    <div class="card-body">
      <h2 class="card-title">New Post</h2>
      <form method="POST" action="{{ route('posts.store') }}" class="space-y-4">
        @csrf
        <label class="form-control">
          <span class="label-text mb-1">Title</span>
          <input name="title" class="input input-bordered w-full" value="{{ old('title') }}">
        </label>
        <label class="form-control">
          <span class="label-text mb-1">Body</span>
          <textarea name="body" class="textarea textarea-bordered w-full h-56">{{ old('body') }}</textarea>
        </label>
        <div class="flex gap-2 justify-end">
          <a href="{{ route('posts.index') }}" class="btn">Cancel</a>
          <button class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection
