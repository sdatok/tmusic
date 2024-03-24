import likebtn from "@/assets/likebutton.svg";
import commentbtn from "@/assets/commentbutton.svg";
import playbtn from "@/assets/playbutton.svg";
import React, { useState, useRef } from "react";

export const PostItem = ({ post }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    console.log(post);

    // Define handler functions for each button
    const handleLike = () => {
        // Implement like functionality
        console.log("Like clicked for", post.title);
    };

    const handleComment = () => {
        // Implement comment functionality
        console.log("Comment clicked for", post.title);
    };

    const handlePlayError = (error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false); // Reset playing state on error
    };

    const handlePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // Toggle the playing state
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg relative mb-4 grid grid-cols-12">
            <div className="col-span-8 p-4 flex flex-col justify-between">
                <div>
                    <div className="text-xl font-bold">{post.title}</div>
                    <div className="text-md mb-2 text-gray-500">
                        by <span className="font-bold">{post.artist}</span>
                    </div>
                    <div className="text-sm mb-2 text-gray-700">
                        {post.description}
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={handleLike}
                        className="flex items-center space-x-1"
                    >
                        <img src={likebtn} alt="Like button" />
                    </button>
                    <button
                        onClick={handleComment}
                        className="flex items-center space-x-1"
                    >
                        <img src={commentbtn} alt="Comment button" />
                    </button>
                    <button
                        onClick={handlePlay}
                        className="flex items-center space-x-1"
                    >
                        <img src={playbtn} alt="Play button" />
                    </button>
                    <audio
                        ref={audioRef}
                        onEnded={() => setIsPlaying(false)}
                        onError={handlePlayError}
                    >
                        <source src={post.preview_url} type="audio/mpeg" />
                    </audio>
                    <div className="text-md mb-2 text-gray-500">
                        Posted by{" "}
                        <span className="font-bold">{post.User?.name}</span>
                    </div>
                </div>
            </div>
            <div className="col-span-4">
                <img
                    className="w-full h-full object-cover"
                    src={
                        post.album_cover
                            ? post.album_cover
                            : "https://place-hold.it/300x300"
                    }
                    alt={post.title}
                />
            </div>
        </div>
    );
};
