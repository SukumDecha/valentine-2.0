'use client'

import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Stack from '@/components/VinylLayout/Stack'
import Vinyl from '@/components/VinylLayout/Vinyl'
import FadeIn from '@/components/Shared/animations/FadeIn'
import { IUserResponse } from '@/types/vinyl/vinyl'
import useResponsive from '@/hooks/useResponsive'
import SlideIn from '@/components/Shared/animations/SlideIn'
import SpotifyEmbed from '@/components/Shared/SpotifyEmbed'
import ImageOverlay from '@/components/Shared/CardStackOverlay'

interface IProps {
    data: IUserResponse
}

const RomanVinyl = ({ data }: IProps) => {
    const { isMobile, isMiniTablet } = useResponsive()

    const stackSize = {
        width: isMobile ? 190 : isMiniTablet ? 300 : 500,
        height: isMobile ? 230 : isMiniTablet ? 350 : 550
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
    }

    return (
        <>
            <div className="mx-auto ">
                <div className="bg-[url('/vinyl/bgBrown.jpg')] libre-baskerville-regular-italic bg-cover p-9 bg-top overflow-auto bg-no-repeat h-screen">
                    <FadeIn>
                        <p className="none sm:block text-[#5B5B5B] libre-baskerville-regular-italic text-4xl font-bold mt-14 text-center">Our Memories Playlist</p>
                    </FadeIn>

                    <div className="sm:none absolute left-0 top-[240px]">
                        <img src="/vinyl/armleft.png" alt="armleft" className='w-[150px] sm:w-[400px]' />
                    </div>
                    <div className="sm:none absolute right-0 top-[-30px]">
                        <img src="/vinyl/armright.png" alt="right" className='w-[150px] sm:w-[400px]' />
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <div className="flex w-full h-full flex-col items-center justify-center height sm:flex-row sm:gap-24">
                            <FadeIn>
                                <div className="relative">
                                    <FadeIn>
                                        <p className="sm:hidden text-lg sm:text-xl text-[#5B5B5B] libre-baskerville-regular-italic mt-14">Our Memories Playlist</p>
                                    </FadeIn>
                                </div>
                            </FadeIn>

                            <FadeIn>
                                <div className="mt-14 relative">
                                    <FadeIn>
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
                                                    <Stack cardDimensions={stackSize} cardsData={data.images} />
                                                </ImageOverlay> : <Stack cardDimensions={stackSize} cardsData={data.images} />
                                        }
                                    </FadeIn>
                                </div>
                            </FadeIn>

                            <div className="hidden elative sm:flex flex-col items-center gap-10 mt-10">
                                <div className="pb-12">
                                    <InfiniteRotate>
                                        <Vinyl size={vinylSize} imgUrl={data.trackImage} />
                                    </InfiniteRotate>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SlideIn
                        yOffset={'300%'}
                        duration={1}
                        className="sm:block w-[70vw] sm:w-[600px] mx-auto mt-16 sm:mt-0 relative"
                    >
                        <div className="relative z-[100]">
                            <SpotifyEmbed trackId={data.trackId as string} />
                        </div>
                        <div className="absolute left-[-70px] top-0 z-50">
                            <img src="/vinyl/kid.png" alt="armleft" />
                        </div>
                        <div className="absolute right-[-80px] top-0 z-50">
                            <img src="/vinyl/rose.png" alt="right" />
                        </div>
                    </SlideIn>


                    <div className="text-center text-slate-700 opacity-50 my-8 sm:text-2xl">Valentine 2.0</div>
                </div>
            </div>
        </>
    )
}

export default RomanVinyl
