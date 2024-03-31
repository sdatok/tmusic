import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart, faComment, faPlay, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

export const PostItem = ({ post, spotifyUserProfile }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.5); // Initial volume
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    // Toggles play/pause for the audio
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Updates the volume based on slider input
    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setVolume(newVolume);
    };

    // Determine which volume icon to display
    const volumeIcon = volume > 0 ? faVolumeUp : faVolumeMute;

    return (
        <div className="bg-white shadow-lg relative mb-4 flex flex-col md:flex-row rounded-lg overflow-hidden">
            <div className="p-4 flex flex-col justify-between flex-1">
                <div className="mb-4">
                    {/* Spotify user's profile picture and display name */}
                    {spotifyUserProfile && (
                        <div className="flex items-center mb-4">
                            <img src={spotifyUserProfile.images[0]?.url || 'https://place-hold.it/50x50'} alt="User Profile" className="rounded-full w-8 h-8 mr-2" />
                            <span className="font-bold">{spotifyUserProfile.display_name}</span>
                        </div>
                    )}

                    <div className="font-bold text-lg mb-1">{post.title}</div>
                    <p className="text-gray-600 mb-2">by {post.artist}</p>
                    <p className="text-gray-700 mb-4">{post.description}</p>
                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={handlePlayPause}>
                        <FontAwesomeIcon icon={faPlay} size="lg" />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={farHeart} size="lg" />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faComment} size="lg" />
                    </button>
                    <button onClick={() => setShowVolumeSlider(!showVolumeSlider)}>
                        <FontAwesomeIcon icon={volumeIcon} size="lg" />
                    </button>
                    {showVolumeSlider && (
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-24"
                        />
                    )}
                </div>
            </div>
            <div className="md:w-48 flex-none">
                <img src={post.album_cover || "https://place-hold.it/300x300"} alt={post.title} className="object-cover w-full h-full" />
            </div>
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} src={post.preview_url}></audio>
        </div>
    );
};
