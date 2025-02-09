import InfiniteRotate from "@/components/Shared/animations/InfiniteRotate"
import Stack from "../../Stack"
import Vinyl from "../../Vinyl"
import MidNightCloud from "./MidNightCloud"
import useResponsive from "@/hooks/useResponsive"
import { CSSProperties } from "react"
import MidNightMoon from "./MidNightMoon"

const MidNightVinylTheme = () => {
    const { isMobile, isTablet } = useResponsive()

    const moonStyle: CSSProperties = {
        position: 'absolute',
        top: isMobile ? -40 : isTablet ? 0 : 0,
        left: isMobile ? -25 : isTablet ? 0 : 0
    }


    const cloudStyleA: CSSProperties = {
        position: 'absolute',
        top: isMobile ? -50 : isTablet ? 0 : 0,
        right: isMobile ? -70 : isTablet ? 0 : 0
    }

    const cloudStyleB: CSSProperties = {
        position: 'absolute',
        top: isMobile ? 400 : isTablet ? 0 : 0,
        left: isMobile ? -70 : isTablet ? 0 : 0
    }

    const cloudStyleC: CSSProperties = {
        position: 'absolute',
        top: isMobile ? 600 : isTablet ? 0 : 0,
        right: isMobile ? -70 : isTablet ? 0 : 0
    }


    return (
        <>
            <div className='flex flex-col justify-center items-center sm:h-screen bg-blue-900 h-screen overflow-hidden overflow-y-scroll'>
                <div className="w-full flex items-center justify-center">
                    <div className="flex w-full h-full flex-col items-center justify-center sm:flex-row sm:gap-20 relative mt-32">
                        <MidNightMoon styles={moonStyle} />
                        <MidNightCloud styles={cloudStyleA} />
                        <MidNightCloud styles={cloudStyleB} />
                        <MidNightCloud styles={cloudStyleC} />

                        <div className='sm:hidden text-white text-2xl mb-4'>
                            Our Memories Playlist
                        </div>

                        <Stack cardDimensions={{ width: 300, height: 400 }} />

                        <div className="relative flex flex-col items-center gap-10 mt-10">
                            <div className="text-white text-xl">Lyrics will be played here</div>
                            <InfiniteRotate>
                                <Vinyl size={{ width: 300, height: 300 }} />
                            </InfiniteRotate>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MidNightVinylTheme