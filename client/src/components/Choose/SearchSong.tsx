"use client"
import { Search } from 'lucide-react';
import SpotifyEmbed from '@/components/Choose/SpotifyEmbed';
import { useTrackSearch, useTrackSelection } from '@/hooks/useTrack';
import { ITrack } from '@/types/track';

const SearchSong = ({ uuid_slug }: { uuid_slug: string }) => {
    const {
        selectedTrack,
        setSelectedTrack,
        searchQuery,
        setSearchQuery,
        isSearching,
        error,
        tracks,
        handleSearch
    } = useTrackSearch();

    const {
        chooseTrack,
        handleAddTrack
    } = useTrackSelection(uuid_slug);

    const handleSelectTrack = (track: ITrack) => {
        console.log('Selected track:', track);
        setSelectedTrack(track);
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
                                    className={`w-full p-2 text-left rounded hover:bg-white/10 transition-colors flex justify-between items-center gap-2 ${track.trackId === selectedTrack?.trackId ? 'bg-white/20' : ''
                                        }`}
                                >
                                    <div>
                                        <p className="font-medium">{track.trackName}</p>
                                        <p className="text-sm text-white/70">{track.artistName}</p>
                                    </div>
                                    <img src={track.trackImage} className='rounded-lg w-16 h-16' />
                                </button>
                            ))}
                        </div>
                    )}
                    {selectedTrack && (
                        <form onSubmit={(e) => handleAddTrack(e, selectedTrack.trackId, selectedTrack.trackImage)}>
                            <SpotifyEmbed trackId={selectedTrack.trackId} />
                            <button
                                className={`mt-4 w-full p-2 bg-green-600 transition-all hover:bg-green-600/90 duration-300 text-white rounded-lg ${chooseTrack ? 'scale-105' : ''
                                    }`}
                            >
                                {chooseTrack ? (
                                    <span className="inline-block animate-bounce">✅</span>
                                ) : (
                                    `${selectedTrack.trackName} - ${selectedTrack.artistName}`
                                )}
                            </button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchSong;