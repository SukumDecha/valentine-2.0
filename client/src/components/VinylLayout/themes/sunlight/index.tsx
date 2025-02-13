'use client'

import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Stack from '@/components/VinylLayout/Stack'
import ImageOverlay from '@/components/Shared/CardStackOverlay'
import SunlightBackground from '@/components/VinylLayout/themes/sunlight/SunlightBackground'
import SunlightFlowerOne from '@/components/VinylLayout/themes/sunlight/SunlightFlowerOne'
import SunlightFlowerTwo from '@/components/VinylLayout/themes/sunlight/SunlightFlowerTwo'
import Vinyl from '@/components/VinylLayout/Vinyl'
import React from 'react'
import useResponsive from '@/hooks/useResponsive'
import { IUserResponse } from '@/types/vinyl/vinyl'

interface IProps {
    data: IUserResponse
}

const SunlightVinyl = ({ data }: IProps) => {
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
        <div className="font-Libre italic text-[#5B5B5B] antialiased">
            <SunlightBackground>
                <div className="pt-20 text-center text-xl">Our Memories Playlist</div>

                <div className="flex flex-col items-center justify-center gap-20 pb-20 md:h-screen md:flex-row">
                    <ImageOverlay
                        overlayElements={[
                            <div className='z-40 absolute -bottom-14 -left-14'><SunlightFlowerOne width={117 * 1.5} height={133 * 1.5} /></div>,
                            <div className='z-40 absolute -bottom-14 -right-14'><SunlightFlowerTwo width={117 * 1.5} height={133 * 1.5} /></div>,
                        ]}
                    >
                        <Stack cardDimensions={stackSize} cardsData={data.images} />
                    </ImageOverlay>

                    <div>
                        <div className="my-4 text-center text-2xl">Lyrics will be put here</div>
                        <InfiniteRotate>
                            <Vinyl size={vinylSize} imgUrl={data.trackImage} />
                        </InfiniteRotate>
                    </div>
                </div>

                <div className="pb-20 text-center text-sky-400 opacity-50 text-2xl">Valentine 2.0</div>
            </SunlightBackground>
        </div>
    )
}

export default SunlightVinyl
