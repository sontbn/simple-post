<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

Route::get('/', fn() => redirect()->route('posts.index'));

Route::get('/register',[AuthController::class,'showRegister'])->name('register.show');
Route::post('/register',[AuthController::class,'register'])->name('register.perform');
Route::get('/login',[AuthController::class,'showLogin'])->name('login.show');
Route::post('/login',[AuthController::class,'login'])->name('login.perform');
Route::post('/logout',[AuthController::class,'logout'])->name('logout.perform');

Route::middleware('auth')->group(function () {
    Route::get('/posts/create',[PostController::class,'create'])->name('posts.create');
    Route::post('/posts',[PostController::class,'store'])->name('posts.store');
    Route::get('/posts/{post}/edit',[PostController::class,'edit'])->name('posts.edit');
    Route::put('/posts/{post}',[PostController::class,'update'])->name('posts.update');
    Route::delete('/posts/{post}',[PostController::class,'destroy'])->name('posts.destroy');
});

Route::get('/posts',[PostController::class,'index'])->name('posts.index');
Route::get('/posts/{post}',[PostController::class,'show'])->name('posts.show');
