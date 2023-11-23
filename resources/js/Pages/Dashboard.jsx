import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useEffect, useState} from "react";
import SpotifyAuthPopup from '@/Pages/SpotifyAuthPopup.jsx';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';
import {PostList} from "@/Pages/Post/PostList.jsx";

export default function Dashboard({auth, posts, spotify}) {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [tracks, setTracks] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showSpotifyPopup, setShowSpotifyPopup] = useState(false);



    useEffect(() => {

        // Check if there's a Spotify token in local storage
        const spotifyToken = spotify.token;
        const CLIENT_ID = spotify.client_id;
        const CLIENT_SECRET = spotify.client_secret;

        if (!spotifyToken) {
            // Redirect to your Laravel route for authorization
            window.location.href = '/authorize-spotify';
        } else {
            setAccessToken(spotifyToken);
        }
        //API ACCESS TOKEN
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        };
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, []);

        const fetchData = async () => {
            try {
                var searchParameters = {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                };

                const response = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParameters);
                const data = await response.json();
                // console.log(data.tracks.items);
                setTracks(data.tracks.items);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        useEffect(() => {
            if (searchInput !== "") {
                fetchData();
            }
        }, [searchInput, accessToken]);

    //When a song is selected
    const handleSongClick = (track) => {
        setSelectedPost({
            title: track.name,
            album: track.album.name,
            artist: track.artists[0].name,
            album_cover: track.album.images[0].url,
            description: "", // Initially empty; the user can enter a description
        });
    };

    const submitPost = (e) => {
        // e is the button.. or the event...
        e.preventDefault();

            // Assuming `selectedPost` has all the data you need to submit
        router.post('/posts', selectedPost);
            // .then(response => {
            //     console.log('Post created:', response.data.post);
            //     // Handle any additional actions like redirecting or updating state here.
            // })
            // .catch(error => {
            //     console.error('There was an error submitting the form:', error);
            //     // Handle errors, such as displaying validation error messages
            // });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-gray-800 dark:text-gray-200 leading-tight">TMUsic</h2>}
        >
            <Head title="Dashboard"/>

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center">
                    <input
                        className="border-2 border-gray-300 w-1/2 p-2 mr-2"
                        placeholder="Search For Song"
                        type="text"
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                fetchData();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            fetchData();
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
            {selectedPost && (
                <div className="container mx-auto px-4 mb-8">
                    <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg flex p-4 mb-4">
                        <div className="w-2/3 p-2">
                            <form onSubmit={submitPost}>
                            <div className="text-xl font-bold">{selectedPost.title}</div>
                            <div className="text-md mb-2 text-gray-500">{selectedPost.artist}</div>
                            <textarea
                                className="text-sm border-2 border-gray-300 w-full p-2 mb-2 rounded-lg"
                                placeholder="Type your description here"
                                value={selectedPost.description}
                                onChange={event => setSelectedPost({ ...selectedPost, description: event.target.value })}
                                style={{ resize: 'none' }}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Submit
                            </button>
                            </form>
                        </div>
                        <img className="w-1/3" src={selectedPost.album_cover} alt={selectedPost.title} />
                    </div>

                    {/*<PostList postsFor={selectedPost.artist} />*/}
                </div>

            )}
            <PostList posts={posts}/>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-4 mx-2">
                    {tracks && tracks.map((track, i) => {
                        return (
                            <div
                                className="max-w-xs overflow-hidden shadow-lg cursor-pointer"
                                key={i}
                                onClick={() => handleSongClick(track)}
                            >
                                <img className="w-full" src={track.album.images[0].url} alt={track.name} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-white text-l mb-2 line-clamp-3">{track.name}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Conditionally render the SpotifyAuthPopup */}
                {showSpotifyPopup && <SpotifyAuthPopup onClose={() => setShowSpotifyPopup(false)} />}
            </div>

        </AuthenticatedLayout>
    );
}
