import React, {useState} from 'react';
import PostItem from "./PostItem.jsx"; // Adjusted for default import

const PostList = ({ posts, spotifyUserProfile }) => {
    const [volume, setVolume] = useState(0.5); // Central volume state

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
    };

    return (
        <div className="px-6 md:px-12 lg:px-32">
            {posts.map((post) => (
                <PostItem
                    key={post.id} // Assuming each post has a unique id
                    post={post}
                    spotifyUserProfile={spotifyUserProfile}
                    volume={volume} // Pass the current volume as a prop
                    onVolumeChange={handleVolumeChange} // Pass the function to handle volume change
                />
            ))}
        </div>
    );
};

export default PostList;
