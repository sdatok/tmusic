import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useEffect, useState} from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

const CLIENT_ID = "f447bf4cf4ea4195a01796a7e26dcba7";
const CLIENT_SECRET = "71ec81c0596242b88cf4d1c463903631";

// import Foryou from "./Foryou.jsx";

export default function Dashboard({auth}) {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        //API ACCESS TOKEN
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    //Search
    async function search() {
        console.log("Search for " + searchInput); //ie. Kanye West

        //Get request using search to get Song title
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => {return data.artists.items[0].id})

        console.log("Artist ID is " + artistID);
        //Get request with Artist ID grab all albums from that artist
        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAlbums(data.items);
            });
        //Display those albums
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-3 flex items-center">
                    <input
                        className="border-2 border-gray-300 w-1/2 p-2 mr-2"
                        placeholder="Search For Artist"
                        type="text"
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            search();
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-4 mx-2">
                    {albums.map((album, i) => {
                        return (
                            <div className="max-w-xs rounded-xl overflow-hidden shadow-lg" key={i}>
                                <img className="w-full" src={album.images[0].url} alt={album.name} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-white text-xl mb-2">{album.name}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/*<Container>*/}
            {/*    <InputGroup className="mb-3" size="1g">*/}
            {/*        <FormControl*/}
            {/*            placeholder="Search For Artist"*/}
            {/*            type=" input"*/}
            {/*            onKeyPress={event => {*/}
            {/*                if (event.key == "Enter") {*/}
            {/*                    console.log("Pressed enter");*/}
            {/*                }*/}
            {/*            }}*/}
            {/*            onChange={event => setSearchInput(event.target.value)}*/}
            {/*        />*/}
            {/*        <Button onClick={() => {*/}
            {/*            console.log("Clicked button")*/}
            {/*        }}>*/}
            {/*            Search*/}
            {/*        </Button>*/}
            {/*    </InputGroup>*/}
            {/*</Container>*/}
            {/*<Container>*/}
            {/*    <Row className="mx-2 row row-cols-4">*/}
            {/*        {albums.map( (album, i)=> {*/}
            {/*            return (*/}
            {/*                <Card>*/}
            {/*                    <Card.Img src="album.images[0].url"/>*/}
            {/*                    <Card.Body>*/}
            {/*                        <Card.Title>{album.name}</Card.Title>*/}
            {/*                    </Card.Body>*/}
            {/*                </Card>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    </Row>*/}
            {/*</Container>*/}

            {/*<div className="w-5 h5">*/}
            {/*<Foryou/>*/}
            {/*</div>*/}
        </AuthenticatedLayout>
    );
}
