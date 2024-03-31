import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import SpotifyAuthPopup from "@/Pages/SpotifyAuthPopup.jsx";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";
import { PostList } from "@/Pages/Post/PostList.jsx";


export default function Dashboard({ auth, posts, spotify }) {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [tracks, setTracks] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [spotifyUserProfile, setSpotifyUserProfile] = useState(null); // Add this line


    useEffect(() => {
        const accessToken = localStorage.getItem('spotifyAccessToken');
        const tokenExpiry = localStorage.getItem('spotifyTokenExpiry');
        const now = new Date();

        if (!accessToken || now > parseInt(tokenExpiry)) {
            // Redirect to Spotify authorization if no valid token is found
            window.location.href = "/authorize-spotify";
        }else{
            fetchSpotifyUserProfile(accessToken);
        }
    }, [accessToken]);

    const fetchSpotifyUserProfile = async (accessToken) => {
        try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (!response.ok) throw new Error('Failed to fetch Spotify user profile');
            const userProfileData = await response.json();
            setSpotifyUserProfile(userProfileData); // Set user profile data
        } catch (error) {
            console.error("Error fetching Spotify user profile:", error);
        }
    };

    const fetchData = async () => {
        if (!searchInput.trim()) return;

        const accessToken = localStorage.getItem('spotifyAccessToken');

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setTracks(data.tracks.items);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (searchInput !== "") {
            fetchData();
        }
    }, [searchInput, accessToken]);

    useEffect(() => {
        // If the search input is empty, clear the tracks
        if (searchInput === "") {
            setTracks([]);
        }
    }, [searchInput]);

    //When a song is selected
    const handleSongClick = (track) => {
        // console.log(track);
        setSelectedPost({
            title: track.name,
            album: track.album.name,
            artist: track.artists.map((artist) => artist.name).join(", "),
            album_cover: track.album.images[0].url,
            user: auth.user,
            preview_url: track.preview_url,
            description: "", // Initially empty; the user can enter a description
        });
        // Clear the tracks list to make other songs disappear
        setTracks([]);
    };

    const submitPost = (e) => {
        e.preventDefault();
        // Assuming `selectedPost` has all the data you need to submit
        Inertia.post("/posts", selectedPost).then(() => {
            window.location.reload();
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="container mx-auto px-8 py-8 ">
                <div className="relative">
                    <input
                        className="rounded-md border-2 border-gray-300 w-1/2 mr-2"
                        placeholder="Post a Song"
                        type="text"
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                fetchData();
                            }
                        }}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <button
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            fetchData();
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Only render this section if there are tracks to display */}
            {tracks.length > 0 && (
                <div className="container mx-auto px-4 mb-8 p-4">
                    <div className="grid grid-cols-4 gap-4 mx-2 overflow-y-auto h-auto md:h-96 sm:h-40">
                        {tracks &&
                            tracks.map((track, i) => {
                                return (
                                    <div
                                        className="bg-white rounded-lg max-w-xs shadow-lg cursor-pointer"
                                        key={i}
                                        onClick={() => handleSongClick(track)}
                                    >
                                        <img
                                            className="w-full object-cover"
                                            src={track.album.images[0].url}
                                            alt={track.name}
                                        />
                                        <div className="px-4 py-2">
                                            {/* Song Name */}
                                            <div className="font-bold text-black text-l mb-1 line-clamp-1">
                                                {track.name}
                                            </div>
                                            {/* Artist Name */}
                                            <div className="text-gray-600 text-sm line-clamp-1">
                                                {track.artists
                                                    .map(
                                                        (artist) => artist.name
                                                    )
                                                    .join(", ")}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}

            {selectedPost && (
                <div className="container mx-auto px-4 mb-8">
                    <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg relative mb-4 grid grid-cols-12">
                        <div className="col-span-8 p-4 flex flex-col justify-between">
                            <form onSubmit={submitPost}>
                                <div className="text-xl font-bold">
                                    {selectedPost.title}
                                </div>
                                <div className="text-md mb-2 text-gray-500">
                                    {" "}
                                    by{" "}
                                    <span className="font-bold">
                                        {selectedPost.artist}
                                    </span>
                                </div>

                                <textarea
                                    className="text-sm border-2 border-gray-300 w-full p-2 mb-2 rounded-lg"
                                    placeholder="Type your description here"
                                    value={selectedPost.description}
                                    onChange={(event) =>
                                        setSelectedPost({
                                            ...selectedPost,
                                            description: event.target.value,
                                        })
                                    }
                                    style={{ resize: "none", height: "80px" }}
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="col-span-4">
                            <img
                                className="w-full h-full object-cover"
                                src={selectedPost.album_cover}
                                alt={selectedPost.title}
                            />
                        </div>
                    </div>
                </div>
            )}
            <PostList posts={posts} spotifyUserProfile={spotifyUserProfile} />
            {/* Conditionally render the SpotifyAuthPopup */}
            {/*{showSpotifyPopup && (*/}
            {/*    <SpotifyAuthPopup onClose={() => setShowSpotifyPopup(false)} />*/}
            {/*)}*/}
        </AuthenticatedLayout>
    );
}
