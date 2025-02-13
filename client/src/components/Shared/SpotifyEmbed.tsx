import useResponsive from "@/hooks/useResponsive";
import { useEffect } from "react";

interface SpotifyEmbedProps {
    trackId: string | '';
}

const SpotifyEmbed = ({ trackId }: SpotifyEmbedProps) => {
    const { isMobile } = useResponsive()
    return (
        <div className='w-full mt-5'>
            <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&autoplay=1`}
                width="100%"
                height={isMobile ? 180 : 200}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default SpotifyEmbed;
