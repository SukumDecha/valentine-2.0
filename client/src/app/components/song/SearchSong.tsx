"use client"
import { Search } from 'lucide-react';
import { useState } from 'react';
import { searchTrack } from '@/services/song.service';
import SpotifyEmbed from './SpotifyEmbed';
import { Track } from '@/shared/types';


const SearchSong = () => {
    const [selectedTrack, setSelectedTrack] = useState<string>('');
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
                setSelectedTrack(result.tracks[0].trackId);
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

    const handleSelectTrack = (track: Track) => {
        setSelectedTrack(track.trackId);
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a song..."
                        className="w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm md:text-base"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
                        disabled={isSearching}
                    >
                        <Search className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
                {error && <p className="text-red-200 mt-2 text-sm md:text-base">{error}</p>}
            </form>

            {isSearching ? (
                <div className="flex justify-center items-center mt-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                </div>
            ) : (
                <>
                    {tracks.length > 0 && (
                        <div className="mt-4 space-y-2 rounded-lg">
                            {tracks.map((track) => (
                                <button
                                    key={track.trackId}
                                    onClick={() => handleSelectTrack(track)}
                                    className={`w-full p-2 text-left rounded hover:bg-white/10 transition-colors ${track.trackId === selectedTrack ? 'bg-white/20' : ''
                                        }`}
                                >
                                    <p className="font-medium">{track.trackName}</p>
                                    <p className="text-sm text-white/70">{track.artistName}</p>
                                </button>
                            ))}
                        </div>
                    )}
                    {selectedTrack && <SpotifyEmbed trackId={selectedTrack} />}
                </>
            )}
        </div>
    );
};

export default SearchSong;