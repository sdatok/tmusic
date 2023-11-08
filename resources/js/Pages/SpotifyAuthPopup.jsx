import React from 'react';

export default function SpotifyAuthPopup({ onClose }) {
    // Add your Spotify authorization code here

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {/* Add your Spotify authorization content here */}
                <h2 className="text-xl font-semibold mb-2">Spotify Authorization</h2>
                <p>Click the button below to authorize your Spotify account.</p>
                {/* Add your Spotify authorization button here */}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => {
                        // Add your Spotify authorization logic here
                        // Once authorized, close the pop-up
                        onClose();
                    }}
                >
                    Authorize Spotify
                </button>
            </div>
        </div>
    );
}
