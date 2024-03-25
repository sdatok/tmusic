import likebtn from "@/assets/likebutton.svg";
import commentbtn from "@/assets/commentbutton.svg";
import playbtn from "@/assets/playbutton.svg";
import React, { useState, useRef } from "react";
import volumeMuteBtn from "@/assets/volumeMuteBtn.svg";
import volumeHighBtn from "@/assets/volumeHighBtn.svg";

export const PostItem = ({ post }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.3); // Full volume
    const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Controls the display of the slider
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
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
        }
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // Toggle the playing state
    };

    const toggleVolumeSlider = () => {
        setShowVolumeSlider(!showVolumeSlider);
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.valueAsNumber;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const volumeIcon = volume > 0 ? volumeHighBtn : volumeMuteBtn;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg relative mb-4 grid grid-cols-4 mb-8">
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
                    <button onClick={toggleVolumeSlider} className="">
                        <img
                            src={volumeIcon}
                            alt="Volume"
                            className="w-7 h-7 flex right-2 absolute space-x-1"
                        />
                    </button>
                    <button
                        onClick={toggleVolumeSlider}
                        className="flex items-center space-x-1"
                    ></button>
                    {showVolumeSlider && (
                        <div className="absolute top-14 -right-7">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                style={{
                                    writingMode: "bt-lr",
                                    transform: "rotate(-90deg)",
                                }}
                            />
                        </div>
                    )}
                    <div className="audio-controls">
                        <audio
                            ref={audioRef}
                            onEnded={() => setIsPlaying(false)}
                            onError={handlePlayError}
                        >
                            <source src={post.preview_url} type="audio/mpeg" />
                        </audio>
                    </div>
                    <div className="text-md flex items-center space-x-1 text-gray-500 ">
                        Posted by <span className="font-bold">{""}</span>
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
