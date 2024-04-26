import React, {useState, useRef, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeUp, faVolumeMute, faPause,} from "@fortawesome/free-solid-svg-icons";
import {faHeart, faComment, faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faPlay as faPlay} from "@fortawesome/free-solid-svg-icons";
import {Inertia} from "@inertiajs/inertia"; // solid icons for filled versions
import defaultUserImage from '@/assets/user.svg';


const PostItem = ({
                      post,
                      user,
                      spotifyUserProfile,
                      volume,
                      onLikeCountChange,
                      likeCount,
                      userLikes,
                      onVolumeChange
                  }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [liked, setLiked] = useState(false);

    // for comments
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [showCommentBox, setShowCommentBox] = useState(false);
    const commentsEndRef = useRef(null);

    const handleCommentButtonClick = () => {
        setShowCommentBox(!showCommentBox);
        // Load sample comments here if needed
        if (comments.length === 0) {  // Simulating initial load of comments
            setComments(["Sample comment 1", "Sample comment 2"]);
        }
    };

    const handleCommentSubmit = () => {
        if (commentText.trim() === "") return;
        const newComments = [commentText, ...comments];
        setComments(newComments);
        setCommentText("");
        setShowCommentBox(false);
    };

    // on click of the like button, toggle the liked state and send a request to the server to update the liked status
    const handleLike = () => {

        setLiked(!liked);
        const updatedLikeCount = liked ? likeCount - 1 : likeCount + 1;
        onLikeCountChange(post.id, updatedLikeCount); // Call the function passed from the parent


        // axios post request to update the liked status
        axios.post(`/posts/like`, {
            postId: post.id,
            liked: !liked
        }).then((response) => {
            // setLiked(response.data);
        });

    }


    useEffect(() => {

        if (audioRef.current) {
            audioRef.current.volume = volume;
        }


    }, [volume]);

    useEffect(() => {
        // Check if the userLikes object has a 'likes' property and that property is an array with length greater than 0
        if (userLikes.likes && Array.isArray(userLikes.likes) && userLikes.likes.length > 0) {
            // Check if the current post's ID is included in the likes array
            const isPostLiked = userLikes.likes.includes(post.id);
            setLiked(isPostLiked); // Update the 'liked' state based on whether the post is liked
        } else {
            // Optionally, set 'liked' to false if the likes array is empty or not present,
            // assuming that means the user hasn't liked any posts
            setLiked(false);
        }
    }, [userLikes, post.id]);


    // Toggles play/pause for the audio
    const handlePlayPause = () => {
        // console.log("Current isPlaying state before toggle:", isPlaying);
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
    const isCommented = false; // This should be dynamic based on your app's logic

    return (
        <div className="bg-midnight shadow-lg rounded-lg mb-4 py-3">
            <div
                className="text-white lg:text-xl  overflow-hidden grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
                <div className="col-span-2 md:col-span-2 lg:col-span-2 p-4 flex flex-col justify-between">
                    {spotifyUserProfile && (
                        <div className="flex items-center space-x-2 mb-2">
                            <img src={post.user.profile_url ? post.user.profile_url : defaultUserImage}
                                 alt="User Profile"
                                 className="rounded-full w-8 h-8"/>
                            <span>{post.user.name}</span>
                        </div>
                    )}
                    <div>
                        <div className="lg:text-xl md:text-xl font-bold text-sm truncate">{post.title}</div>
                        {/* Applied truncate */}
                        <p className="lg:text-xl md:text-xl text-gray-400 text-xs mb-2 truncate">by {post.artist}</p> {/* Applied truncate */}
                        <p className="lg:text-xl md:text-xl text-gray-300 text-xs mb-2">{post.description}</p>
                    </div>
                    <div className="text-gray-400 flex space-x-3">
                        <button onClick={handlePlayPause} className="inline-flex items-center">
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg"
                                             className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"/>
                        </button>
                        <button className="whitespace-nowrap" onClick={handleLike}>
                            <FontAwesomeIcon icon={liked ? faHeartSolid : faHeart} size="lg"/>
                            <span>&nbsp; {likeCount}</span>
                        </button>
                        <button onClick={handleCommentButtonClick}>
                            <FontAwesomeIcon icon={faComment} size="lg"/>
                        </button>
                        <button onClick={() => setShowVolumeSlider(!showVolumeSlider)}>
                            <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} size="lg"/>
                        </button>
                        {showVolumeSlider && (
                            <input type="range" min="0" max="1" step="0.01" value={volume}
                                   onChange={localHandleVolumeChange} className="w-20"/>
                        )}
                    </div>
                </div>
                <div
                    className="pr-4 md:p-4 col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-center items-center">
                    <div
                        className="rounded-lg aspect-w-1 aspect-h-1 w-full max-w-xs"> {/* Adjust the max-w-* class as needed */}
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
            <div className="">
                {showCommentBox && (
                    <div className="flex items-center justify-between p-3">
                        <input
                            className="flex-grow placeholder-gray-500 text-gray-400  rounded-lg mr-3 bg-tmu border-tmu text-white"
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <button
                            className="bg-tmu text-white rounded-lg text-sm p-2 px-3"
                            onClick={handleCommentSubmit}
                        >
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    </div>

                )}
                <div className="comments px-4 text-gray-400 mt-3">
                    {comments.map((comment, index) => (
                        <div key={index} className="flex start gap-4 w-full mb-2">
                            <div className="flex-shrink-0">
                                {spotifyUserProfile && (
                                    <div className="flex items-center font-bold space-x-2">
                                        <img src={post.user.profile_url ? post.user.profile_url : defaultUserImage}
                                             alt="User Profile"
                                             className="rounded-full w-4 h-4"/>
                                        <span>{post.user.name}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow comment">
                                    {comment}
                            </div>
                            <FontAwesomeIcon icon={faHeart} className="flex-shrink-0"/>
                        </div>
                    ))}
                    <div ref={commentsEndRef}/>
                </div>

            </div>
        </div>

    );
};

export default PostItem;
