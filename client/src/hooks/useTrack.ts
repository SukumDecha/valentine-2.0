import { useState } from 'react';
import { searchTrack, addTrackId } from '@/services/main.service';
import { Track } from '@/shared/types';

export const useTrackSearch = () => {
    const [selectedTrack, setSelectedTrack] = useState<Track>();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [tracks, setTracks] = useState<Track[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setError('');

        try {
            const result = await searchTrack(searchQuery);
            if (result.success && result.tracks && result.tracks.length > 0) {
                setTracks(result.tracks);
                setSelectedTrack(result.tracks[0]);
            } else {
                setError('No tracks found');
            }
        } catch (error) {
            console.error('Error searching track:', error);
            setError('Failed to search track');
        } finally {
            setIsSearching(false);
        }
    };

    return {
        selectedTrack,
        setSelectedTrack,
        searchQuery,
        setSearchQuery,
        isSearching,
        error,
        tracks,
        handleSearch
    };
};

export const useTrackSelection = (uuid_slug: string) => {
    const [chooseTrack, setChooseTrack] = useState<boolean>(false);

    const handleAddTrack = async (e: React.FormEvent<HTMLFormElement>, trackId: string) => {
        e.preventDefault();
        try {
            const result = await addTrackId(uuid_slug, trackId);
            if (result) {
                setChooseTrack(true);
                // Reset button state after animation
                setTimeout(() => {
                    setChooseTrack(false);
                }, 1500);
            }
        } catch (error) {
            console.error('Error adding track:', error);
        }
    };

    return {
        chooseTrack,
        handleAddTrack
    };
};