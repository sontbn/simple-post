@extends('layouts.app')
@section('content')
<div class="max-w-md mx-auto card bg-base-100 shadow-lg rounded-2xl">
  <div class="card-body">
    <h2 class="card-title">Sign Up</h2>
    <form method="POST" action="{{ route('register.perform') }}" class="space-y-4">
      @csrf
      <label class="form-control">
        <span class="label-text mb-1">Name</span>
        <input name="name" class="input input-bordered w-full" value="{{ old('name') }}">
      </label>
      <label class="form-control">
        <span class="label-text mb-1">Email</span>
        <input name="email" type="email" class="input input-bordered w-full" value="{{ old('email') }}">
      </label>
      <label class="form-control">
        <span class="label-text mb-1">Password</span>
        <input name="password" type="password" class="input input-bordered w-full">
      </label>
      <label class="form-control">
        <span class="label-text mb-1">Confirm Password</span>
        <input name="password_confirmation" type="password" class="input input-bordered w-full">
      </label>
      <button class="btn btn-primary w-full">Create Account</button>
    </form>
  </div>
</div>
@endsection
