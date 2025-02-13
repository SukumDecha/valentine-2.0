import useResponsive from "@/hooks/useResponsive";

interface SpotifyEmbedProps {
    trackId: string | '';
    width?: number;
    height?: number;
}

const SpotifyEmbed = ({ trackId, width, height }: SpotifyEmbedProps) => {
    const { isMobile } = useResponsive()
    return (
        <div className='w-full mt-5'>
            <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&autoplay=1`}
                width={width ? width : '100%'}
                height={height ? height : isMobile ? 180 : 200}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default SpotifyEmbed;
