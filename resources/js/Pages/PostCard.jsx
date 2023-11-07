// PostCard.jsx

import React, { useState } from "react";

const PostCard = ({ song, onSave }) => {
    console.log('song variable:', song?.album?.images[0]?.url); // Add this line to log the song object

    const [description, setDescription] = useState("");

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = () => {
        onSave({ ...song, description: description });
        setDescription("");
    };

    // const imageUrls = song.images ? song.album.images.map(image => image.url) : []; // Extract the URLs from the images array
    const imageUrl = song?.album?.images[0]?.url; // Directly access the first image URL with conditional checks

    if (!song || !song.album || !song.album.images || !song.album.images[0] || !imageUrl) {
        return null; // Add a null return if the necessary data is unavailable
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    {/* {imageUrls.map((imageUrl, index) => (
                        <img
                            key={index}
                            className="h-48 w-full object-cover md:w-48"
                            src={imageUrl}
                            alt={song.name}
                        />
                    ))} */}
                    <img
                        className="h-48 w-full object-cover md:w-48"
                        src={imageUrl}
                        alt={song.name}
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{song.album}</div>
                    <p className="block mt-1 text-lg leading-tight font-medium text-black">{song.name}</p>
                    <input
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Add a description (optional)"
                        className="mt-3 border-2 border-gray-300 p-2 w-full"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                        onClick={handleSubmit}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
