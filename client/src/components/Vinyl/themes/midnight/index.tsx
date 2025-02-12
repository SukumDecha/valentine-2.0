'use client'

import InfiniteRotate from "@/components/Shared/animations/InfiniteRotate"
import Stack from "../../Stack"
import Vinyl from "../../Vinyl"
import MidNightLayout from "./MidNightLayout"
import ImageOverlay from "@/components/Shared/CardStackOverlay"
import Image from "next/image"
import useResponsive from "@/hooks/useResponsive"

const MidNightVinylTheme = () => {
    const { isMobile, isMiniTablet } = useResponsive()

    const stackSize = {
        width: isMobile ? 250 : isMiniTablet ? 300 : 500,
        height: isMobile ? 300 : isMiniTablet ? 350 : 550
    }

    const vinylSize = {
        width: isMobile ? 220 : isMiniTablet ? 300 : 450,
        height: isMobile ? 220 : isMiniTablet ? 300 : 450
    }

    return (
        <MidNightLayout>
            <div className="flex flex-col items-center">
                <div className='sm:hidden text-white text-2xl mb-4'>
                    Our Memories Playlist
                </div>

                <Stack cardDimensions={stackSize} />
            </div>



            <div className="relative flex flex-col items-center gap-10 mt-10 z-100">
                <ImageOverlay
                    overlayElements={[
                        <div className='z-40 absolute' style={{
                            bottom: '-3.5rem',
                            left: isMobile ? '-1.5rem' : '-3.5rem'
                        }}>
                            <Image
                                src="/images/vinyl/midnight/blue-flower.png"
                                alt="blue-flower"
                                width={isMobile ? 250 : 300}
                                height={isMobile ? 250 : 300}
                                className="object-contain"
                                draggable={false}
                            />
                        </div>
                    ]}
                >
                    <InfiniteRotate>
                        <Vinyl size={vinylSize} />
                    </InfiniteRotate>
                </ImageOverlay>

            </div>
        </MidNightLayout>

    )
}

export default MidNightVinylTheme