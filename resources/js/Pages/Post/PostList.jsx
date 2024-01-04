import {PostItem} from "@/Pages/Post/PostItem.jsx";

export const PostList = ({ posts }) => (
    <div className="container mx-auto px-4 mb-8">
        {posts.map((post, index) => (
            <PostItem key={index} post={post} />
        ))}
    </div>
);
