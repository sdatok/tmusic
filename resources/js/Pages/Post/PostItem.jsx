import React, {useState, useRef, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeUp, faVolumeMute, faPause} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart, faComment as farComment, faHeart, faComment} from "@fortawesome/free-regular-svg-icons";
import {faHeart as fasHeart, faComment as fasComment} from "@fortawesome/free-solid-svg-icons";
import {  faPlay as faPlay } from "@fortawesome/free-solid-svg-icons"; // solid icons for filled versions


const PostItem = ({post, spotifyUserProfile, volume, onVolumeChange}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);
    // Toggles play/pause for the audio
    const handlePlayPause = () => {
        console.log("Current isPlaying state before toggle:", isPlaying);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // This line ensures the audio loads before attempting to play
                audioRef.current.load();
                audioRef.current.play().catch(error => console.error("Error playing audio:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };
    const localHandleVolumeChange = (event) => {
        onVolumeChange(parseFloat(event.target.value)); // Use the function passed from parent to change volume
    };

    // Assuming you have a state or a way to determine if the post is liked or commented on
    const isLiked = false; // This should be dynamic based on your app's logic
    const isCommented = false; // This should be dynamic based on your app's logic

    return (
        <div className="text-white lg:text-xl bg-midnight shadow-lg mb-4 rounded-lg overflow-hidden grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
            <div className="col-span-2 md:col-span-2 lg:col-span-2 p-4 flex flex-col justify-between">
                {spotifyUserProfile && (
                    <div className="flex items-center space-x-2 mb-2">
                        <img src={spotifyUserProfile.images[0]?.url || 'https://place-hold.it/50x50'} alt="User Profile"
                             className="rounded-full w-8 h-8"/>
                        <span>{spotifyUserProfile.display_name}</span>
                    </div>
                )}
                <div>
                    <div className="lg:text-xl font-bold text-sm truncate">{post.title}</div> {/* Applied truncate */}
                    <p className="lg:text-xl text-gray-400 text-xs mb-2 truncate">by {post.artist}</p> {/* Applied truncate */}
                    <p className="lg:text-xl text-gray-300 text-xs mb-2">{post.description}</p>
                </div>
                <div className="text-gray-400 flex space-x-3">
                    <button onClick={handlePlayPause} className="inline-flex items-center">
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faHeart} size="lg"/>
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faComment} size="lg"/>
                    </button>
                    <button onClick={() => setShowVolumeSlider(!showVolumeSlider)}>
                        <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} size="lg"/>
                    </button>
                    {showVolumeSlider && (
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={localHandleVolumeChange} className="w-20"/>
                    )}
                </div>
            </div>
            <div className="pr-4 md:p-4 col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-center items-center">
                <div className="rounded-lg aspect-w-1 aspect-h-1 w-full max-w-xs"> {/* Adjust the max-w-* class as needed */}
                    <img src={post.album_cover || "https://place-hold.it/300x300"} alt={post.title}
                         className="object-cover object-center rounded-lg"/> {/* Covers the div size */}
                </div>
            </div>
            <audio
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                src={post.preview_url}
                preload="none"> {/* Add preload attribute to improve loading performance */}
            </audio>
        </div>
    );
};

export default PostItem;
