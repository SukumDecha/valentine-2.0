"use client"
import React from 'react';
import { Spotify } from 'react-spotify-embed';

interface SpotifyEmbedProps {
    trackId: string | '';
}

const SpotifyEmbed = ({ trackId }: SpotifyEmbedProps) => {
    return (
        <div className='w-full mt-5'>
            <Spotify height={200} link={`https://open.spotify.com/track/${trackId}`} className='w-full flex items-center py-4 px-3  bg-gradient-to-r from-pink-500 to-red-600' />
        </div>
    );
};

export default SpotifyEmbed;
