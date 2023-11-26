export const PostItem = ({ post }) => (
    <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg flex p-4 mb-4">
        <div className="w-2/3 p-2">
            <div className="text-xl font-bold">{post.title}</div>
            <div className="text-md mb-2 text-gray-500">by <span className="font-bold">{post.artist}</span></div>
            <div className="text-sm mb-2 text-gray-700">{post.description}</div>
            <div className="text-xs text-gray-400">{post.date}</div>
        </div>
        <img className="w-1/3 rounded-lg" src={post.album_cover ? post.album_cover : 'https://place-hold.it/300x300'} alt={post.title} />
    </div>
);
