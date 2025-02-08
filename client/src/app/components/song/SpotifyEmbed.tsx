interface SpotifyEmbedProps {
    trackId: string | '';
}

const SpotifyEmbed = ({ trackId }: SpotifyEmbedProps) => {
    return (
        <div className='w-full mt-5'>
            <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&autoplay=1`}
                width="100%"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default SpotifyEmbed;