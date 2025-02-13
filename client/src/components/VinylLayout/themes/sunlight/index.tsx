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
import SlideIn from '@/components/Shared/animations/SlideIn'
import SpotifyEmbed from '@/components/Shared/SpotifyEmbed'
import FadeIn from '@/components/Shared/animations/FadeIn'

interface IProps {
    data: IUserResponse
}

const SunlightVinyl = ({ data }: IProps) => {
    const { isMobile, isMiniTablet } = useResponsive()

    const stackSize = {
        width: isMobile ? 220 : isMiniTablet ? 300 : 500,
        height: isMobile ? 260 : isMiniTablet ? 350 : 550
    }

    const vinylSize = {
        width: isMobile ? 220 : isMiniTablet ? 300 : 450,
        height: isMobile ? 220 : isMiniTablet ? 300 : 450
    }

    const vinylOverlaySize = {
        width: 320,
        height: 320
    }

    const overlayViylStyle = {
        top: -50,
        left: `calc(50% - ${vinylOverlaySize.width / 2}px)`,
        zIndex: -10
    }

    const stackStyle = {
        xOffset: isMobile ? '0' : '-300%',
        yOffset: isMobile ? '-300%' : '0%'
    }

    const vinylStyle = {
        xOffset: isMobile ? '0' : '300%',
        yOffset: isMobile ? '300%' : '0%'
    }

    return (
        <div className="font-Libre italic text-[#5B5B5B] antialiased">
            <SunlightBackground>
                <div className="pt-20 text-center text-xl sm:text-4xl sm:font-bold">Our Memories Playlist</div>

                <div className="flex flex-col items-center justify-center gap-20 sm:pb-20 md:h-fit md:flex-row mt-24 sm:mt-0">
                    <SlideIn xOffset={stackStyle.xOffset} yOffset={stackStyle.yOffset} duration={1}>
                        {
                            isMobile ?
                                <ImageOverlay
                                    overlayElements={[
                                        <div className='absolute' style={overlayViylStyle}>
                                            <InfiniteRotate>
                                                <Vinyl size={vinylOverlaySize} imgUrl={data.trackImage} />
                                            </InfiniteRotate>
                                        </div>
                                    ]}
                                >
                                    <ImageOverlay
                                        overlayElements={[
                                            <FadeIn delay={1} duration={1} direction='none'>
                                                <div className='z-40 absolute -bottom-14 -left-24'><SunlightFlowerOne width={117 * 1.5} height={133 * 1.5} /></div>
                                            </FadeIn>,
                                            <FadeIn delay={1} duration={1} direction='none'>
                                                <div className='z-40 absolute -bottom-14 -right-24'><SunlightFlowerTwo width={117 * 1.5} height={133 * 1.5} /></div>
                                            </FadeIn>
                                            ,
                                        ]}
                                    >
                                        <Stack cardDimensions={stackSize} cardsData={data.images} />
                                    </ImageOverlay>
                                </ImageOverlay> :
                                <ImageOverlay
                                    overlayElements={[
                                        <FadeIn delay={1} duration={1} direction='none'>
                                            <div className='z-40 absolute -bottom-14 -left-14'><SunlightFlowerOne width={117 * 1.5} height={133 * 1.5} /></div>
                                        </FadeIn>,
                                        <FadeIn delay={1} duration={1} direction='none'>
                                            <div className='z-40 absolute -bottom-14 -right-14'><SunlightFlowerTwo width={117 * 1.5} height={133 * 1.5} /></div>
                                        </FadeIn>
                                        ,
                                    ]}
                                >
                                    <Stack cardDimensions={stackSize} cardsData={data.images} />
                                </ImageOverlay>
                        }

                    </SlideIn>

                    <SlideIn xOffset={vinylStyle.xOffset} yOffset={vinylStyle.yOffset} duration={1}>
                        <div className="hidden sm:block">
                            <InfiniteRotate>
                                <Vinyl size={vinylSize} imgUrl={data.trackImage} />
                            </InfiniteRotate>
                        </div>
                    </SlideIn>
                </div>

                <SlideIn
                    yOffset={'300%'}
                    duration={1}
                    className="sm:block w-[70vw] sm:w-[600px] mx-auto"
                >
                    <SpotifyEmbed trackId={data.trackId as string} />
                </SlideIn>


                <div className="text-center text-sky-400 opacity-50 text-2xl mt-20">Valentine 2.0</div>
            </SunlightBackground>
        </div>
    )
}

export default SunlightVinyl
