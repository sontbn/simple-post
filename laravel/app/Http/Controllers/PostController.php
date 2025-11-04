<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index() {
        $posts = Post::with('user')->latest()->paginate(10);
        return view('posts.index', compact('posts'));
    }

    public function show(Post $post) {
        return view('posts.show', compact('post'));
    }

    public function create() {
        return view('posts.create');
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title'=>'required|min:3',
            'body'=>'required|min:5'
        ]);
        Post::create([
            'title'=>$data['title'],
            'body'=>$data['body'],
            'user_id'=>Auth::id()
        ]);
        // return redirect()->route('posts.index');
        return redirect()->route('posts.index')->with('status','Post created');

    }

    public function edit(Post $post) {
        abort_if($post->user_id !== Auth::id(), 403);
        return view('posts.edit', compact('post'));
    }

    public function update(Request $request, Post $post) {
        abort_if($post->user_id !== Auth::id(), 403);
        $data = $request->validate([
            'title'=>'required|min:3',
            'body'=>'required|min:5'
        ]);
        $post->update($data);
        // return redirect()->route('posts.show',$post);
        return redirect()->route('posts.show',$post)->with('status','Post updated');
    }

    public function destroy(Post $post) {
        abort_if($post->user_id !== Auth::id(), 403);
        $post->delete();
        // return redirect()->route('posts.index');
        return redirect()->route('posts.index')->with('status','Post deleted');
    }
}
