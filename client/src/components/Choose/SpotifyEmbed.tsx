import { useEffect } from "react";

interface SpotifyEmbedProps {
    trackId: string | '';
}

const SpotifyEmbed = ({ trackId }: SpotifyEmbedProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            const iframe = document.querySelector('iframe') as HTMLIFrameElement;

            const playButton = document.querySelector('[title="Play"]');
            if (playButton) {
                (playButton as HTMLElement).click();
            } else {
                console.error('Play button not found');
            }

            if (iframe) {
                const iframeWindow = iframe.contentWindow;
                if (iframeWindow) {
                    // Sending a message to the iframe to play the track
                    iframeWindow.postMessage(
                        { method: 'play' },
                        'https://open.spotify.com'
                    );
                    console.log("Play button simulated");
                }
            }
        }, 1000); // Delay to ensure iframe is loaded

        return () => clearTimeout(timer);
    }, [trackId]);

    return (
        <div className='w-full mt-5'>
            <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
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
