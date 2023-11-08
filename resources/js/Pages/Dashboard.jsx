import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useEffect, useState} from "react";
import PostCard from "@/Pages/PostCard.jsx";

const CLIENT_ID = "f447bf4cf4ea4195a01796a7e26dcba7";
const CLIENT_SECRET = "71ec81c0596242b88cf4d1c463903631";

export default function Dashboard({auth}) {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [tracks, setTracks] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
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

    //Search
    // async function search() {
    //     console.log("Search for " + searchInput); //ie. Kanye West
    //
    //     //Get request using search to get Song title
    //     var searchParameters = {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Authorization': 'Bearer ' + accessToken
    //         }
    //     }
    //     var songItems = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParameters)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data.tracks.items);
    //             setSongs(data.tracks.items);
    //         })
    //
    //     console.log("Song Items is " + songItems);
        //Get request with Artist ID grab all albums from that artist
        // var returnedAlbums = await fetch('https://api.spotify.com/v1/tracks/' + songItems + '/tracks' + '?include_groups=album&market=US&limit=50', searchParameters)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         setSongs(data.items);
        //     });

        // var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
        //     .then(response => response.json())
        //     .then(data => {return data.artists.items[0].id})
        //
        // console.log("Artist ID is " + artistID);
        // //Get request with Artist ID grab all albums from that artist
        // var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         setAlbums(data.items);
        //     });
        //Display those albums

    //When a song is selected
    const handleSongClick = (track) => {
        console.log('selectedSong variable:', track);
        setSelectedPost({
            title: track.name,
            album: track.album.name,
            artist: track.artists[0].name,
            albumCover: track.album.images[0].url,
            description: "",
            timePosted: new Date().toString(),
            userPosted: auth.user.name
        });
        // setTracks([track]);
    };
    // const handlePostSave = (post) => {
    //     console.log("Saving post:", post);
    //     // Perform post save operation here
    //     setShowPostCard(false);
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
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
                    <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg flex p-4 mb-4">
                        <div className="w-2/3 p-2">
                            <div className="text-xl font-bold mb-2">{selectedPost.title}</div>
                            <div className="text-lg mb-2">{selectedPost.artist}</div>
                            <textarea
                                className="border-2 border-gray-300 w-full p-2 mb-2"
                                placeholder="Type your description here"
                                value={selectedPost.description}
                                onChange={event => setSelectedPost({ ...selectedPost, description: event.target.value })}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    // Send the selectedPost data to your backend here
                                }}
                            >
                                Submit
                            </button>
                        </div>
                        <img className="w-1/3" src={selectedPost.albumCover} alt={selectedPost.title} />
                    </div>
                </div>
            )}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-4 mx-2">
                    {tracks && tracks.map((track, i) => {
                        return (
                            <div
                                className="max-w-xs rounded-xl overflow-hidden shadow-lg cursor-pointer"
                                key={i}
                                onClick={() => handleSongClick(track)}
                            >
                                <img className="w-full" src={track.album.images[0].url} alt={track.name} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-white text-xl mb-2">{track.name}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/*{showPostCard && selectedSong && (*/}
            {/*    <PostCard song={selectedSong} onSave={handlePostSave} />*/}
            {/*)}*/}

        </AuthenticatedLayout>
    );
}
