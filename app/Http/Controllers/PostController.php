<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\UserSongLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PostController extends Controller
{
    public function store(Request $request)
    {
        Log::alert('yesssir', $request->all());
        $validatedData = $request->validate([
            'song_id' => 'required|string',
            'title' => 'required|string|max:255',
            'album' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'album_cover' => 'required|string',
            'preview_url' => 'nullable|url',
            'description' => 'nullable|string',
        ]);

        $post = $request->user()->posts()->create($validatedData);

        Log::alert('donezo ', $post->toArray());


        // If using Inertia, you can return a proper Inertia response.
        // Return a JSON response with the created post data or a success message


        //        return response()->json([
        //            'post' => $post,
        //            'message' => 'Post created successfully.'
        //        ]);
    }

    public function like(Request $request)
    {
        $post = Post::find($request->postId);

//        $data = $request->validate([
//            'songId' => ['required', Rule::exists('posts', 'song_id')],
//        ]);

        $liked = $request->liked ? $post->like(Auth::user()) : $post->unlike(Auth::user());

        return response()->json([
            'liked' => $liked,
        ]);

    }

    public function getPostsLikes()
    {
        // Assuming you have a 'likes' table with 'post_id' and 'user_id'
        $likeCounts = UserSongLike::query()
            ->select('post_id', DB::raw('count(*) as total_likes'))
            ->groupBy('post_id')
            ->get();

        return response()->json([
            'likeCounts' => $likeCounts,
        ]);
    }

    public function getLikesByUser()
    {
        $user = Auth::user();
        $likes = $user->getLikes();

        return response()->json([
            'likes' => $likes,
        ]);
    }
}
