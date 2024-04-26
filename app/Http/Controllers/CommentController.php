<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'comment' => 'required|string|max:255',
            'post_id' => 'required|exists:posts,id',
        ]);

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'post_id' => $validatedData['post_id'],
            'comment' => $validatedData['comment'],
        ]);

        return redirect()->back()->with('success', 'Comment added successfully.');

    }

    public function likeComment(Comment $comment, Request $request)
    {
        $liked = $comment->like($request->user());

    }

    public function getComments(Post $post)
    {
        return $post->comments()->with('user')->get();
    }
}
