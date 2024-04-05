import React, {useEffect, useMemo, useState} from 'react';
import PostItem from "./PostItem.jsx";

const PostList = ({posts, user, spotifyUserProfile}) => {
    const [volume, setVolume] = useState(0.5); // Central volume state
    const [userLikes, setUserLikes] = useState({likes:[]}); // State to store user likes
    const [likeCount, setLikeCount] = useState({}); // Initialize state to hold like counts

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
    };

    // Add this method to handle like count updates
    const handleLikeCountChange = (postId, newLikeCount) => {
        setLikeCount((prevCounts) => ({
            ...prevCounts,
            [postId]: newLikeCount, // Update the like count for the specific post
        }));
    };


    useEffect(() => {
        axios.post("/posts/totalLikes") // Adjust this endpoint as necessary
            .then((response) => {

                // Transform array of like count objects into an object for easier access
                const counts = response.data.likeCounts.reduce((acc, item) => {
                    acc[item.post_id] = item.total_likes;
                    return acc;
                }, {});

                setLikeCount(counts);

            })
            .catch((error) => console.error("Failed to fetch like counts:", error));
    }, []);


    // get likes by user
    useEffect(() => {
        axios.post("/posts/likes").then((response) => {
            setUserLikes(response.data);
        });
    }, []);

    return (
        <div className="px-6 md:px-12 lg:px-32">
            {posts.map((post) => (
                <PostItem
                    likeCount={likeCount[post.id] || 0}
                    user={user}
                    userLikes={userLikes}
                    key={post.id} // Assuming each post has a unique id
                    post={post}
                    spotifyUserProfile={spotifyUserProfile}
                    volume={volume} // Pass the current volume as a prop
                    onVolumeChange={handleVolumeChange} // Pass the function to handle volume change
                    onLikeCountChange={handleLikeCountChange} // Passing the function down as a prop
                />
            ))}
        </div>
    );
};

export default PostList;
