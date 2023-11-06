import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

const CLIENT_ID = "f447bf4cf4ea4195a01796a7e26dcba7";
const CLIENT_SECRET = "71ec81c0596242b88cf4d1c463903631";

// import Foryou from "./Foryou.jsx";

export default function Dashboard({auth}) {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");

    useEffect(()=>{
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
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>

            <Container>
                <InputGroup className="mb-3" size="1g">
                    <FormControl
                        placeholder="Search For Artist"
                        type=" input"
                        onKeyPress={event => {
                            if (event.key == "Enter") {
                                console.log("Pressed enter");
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={() => {
                        console.log("Clicked button")
                    }}>
                        Search
                    </Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row row-cols-4">
                    <Card>
                        <Card.Img src="#"/>
                        <Card.Body>
                            <Card.Title>Album Name Here</Card.Title>
                        </Card.Body>
                    </Card>

                </Row>
            </Container>

            {/*<div className="w-5 h5">*/}
            {/*<Foryou/>*/}
            {/*</div>*/}
        </AuthenticatedLayout>
    );
}
