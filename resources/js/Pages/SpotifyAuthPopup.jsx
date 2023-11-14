import React from 'react';

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://yourapp.com/dashboard"; // Replace with the actual dashboard URI
const SCOPES = [
    "user-library-read",
    "playlist-modify-public",
    "user-read-currently-playing",
    "user-top-read"
];

export default function SpotifyAuthPopup({ onClose }) {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&response_type=token&show_dialog=true`;

    // Redirect to Spotify's authorization page
    const handleAuthorize = () => {
        window.location.href = authUrl;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Spotify Authorization</h2>
                <p>Click the button below to authorize your Spotify account.</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleAuthorize}
                >
                    Authorize Spotify
                </button>
            </div>
        </div>
    );
}
