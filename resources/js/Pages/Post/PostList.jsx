import {PostItem} from "@/Pages/Post/PostItem.jsx";

export const PostList = ({ posts, spotifyUserProfile }) => (
    <div className="container mx-auto px-4 mb-8">
        {posts.map((post) => (
            <PostItem key={post.id} post={post} spotifyUserProfile={spotifyUserProfile} />
        ))}
    </div>
);
