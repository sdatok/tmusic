import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostList from './Post/PostList';
import axios from 'axios';
import defaultUserImage from '@/assets/user.svg';

export default function UserProfile({ user }) {
    const formattedDate = new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // State for Spotify user profile
    const [spotifyUserProfile, setSpotifyUserProfile] = useState(null);

    // Fetch Spotify user profile data
    useEffect(() => {
        const fetchSpotifyUserProfile = async () => {
            try {
                const response = await axios.get('/spotify-user-profile');
                setSpotifyUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching Spotify user profile:', error);
            }
        };

        fetchSpotifyUserProfile();
    }, []);

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">User Profile</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="p-6 bg-midnight text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-semibold">{user.name}</h2>
                                    <p className="text-sm text-gray-400 mt-4">Joined: {formattedDate}</p>
                                </div>
                                <div>
                                    <img src={user.profile_url ? user.profile_url : defaultUserImage} alt="User Profile" className="w-24 h-24 rounded-full" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-4">Bio</h3>
                                <p className="text-sm text-gray-400">{user.bio}</p>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-4">Social Media</h3>
                                <ul>
                                    <li>
                                        <a href={user.twitter_url} className="text-sm text-gray-400 hover:text-blue-500" target="_blank" rel="noopener noreferrer">Twitter</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Pass spotifyUserProfile to PostList component */}
                    <PostList posts={user.posts} spotifyUserProfile={spotifyUserProfile} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
