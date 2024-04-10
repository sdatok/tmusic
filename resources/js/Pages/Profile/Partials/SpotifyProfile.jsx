import React, { useState, useEffect } from 'react';

export default function SpotifyProfile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('spotify_token');
        if (!accessToken) {
            // console.log('Spotify access token is not available in local storage.');
            // Handle the logic here if the token is not available
            // Maybe redirect to login or show an error message
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Spotify API responded with status ${response.status}`);
                }

                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                // Handle the error here
            }
        };

        fetchUserProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
<div>
    {profile.images.length > 0 && (
        <img
            src={profile.images[0].url}
            alt={profile.display_name}
            className="w-32 h-32 rounded-full object-cover" // Tailwind classes for a 128x128 image
            // Adjust 'w-32 h-32' to the size you want as long as they're the same
        />
    )}
    <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">Welcome, {profile.display_name}!</h1>
</div>


    );
}
