'use client'

import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Stack from '@/components/VinylLayout/Stack'
import Vinyl from '@/components/VinylLayout/Vinyl'
import FadeIn from '@/components/Shared/animations/FadeIn'
import { IUserResponse } from '@/types/vinyl/vinyl'
import useResponsive from '@/hooks/useResponsive'

interface IProps {
    data: IUserResponse
}

const RomanVinyl = ({ data }: IProps) => {
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
        <>
            <div className="max-w-[433px] mx-auto ">
                <div className="bg-[url('/vinyl/bgBrown.jpg')] libre-baskerville-regular-italic bg-cover p-9 bg-top overflow-auto bg-no-repeat h-screen">
                    <div className="w-full flex items-center justify-center">
                        <div className="flex w-full h-full flex-col items-center justify-center height">
                            <div className="relative">
                                <div className="absolute left-[-125px] top-[30px]">
                                    <img src="/vinyl/armleft.png" alt="armleft" className='w-[145px]' />
                                </div>
                                <div className="absolute right-[-125px] top-[-30px]">
                                    <img src="/vinyl/armright.png" alt="right" />
                                </div>
                                <FadeIn>
                                    <p className="text-[20px] text-[#5B5B5B] libre-baskerville-regular-italic mt-14">Our Memories Playlist</p>
                                </FadeIn>
                            </div>
                            <div className="mt-14 relative">
                                <div className="absolute left-[-30px] top-[300px] z-50">
                                    <img src="/vinyl/kid.png" alt="armleft" />
                                </div>
                                <div className="absolute right-[-76px] top-[250px] z-50">
                                    <img src="/vinyl/rose.png" alt="right" />
                                </div>
                                <Stack cardDimensions={stackSize} cardsData={data.images} />
                            </div>
                            <div className="relative flex flex-col items-center gap-10 mt-10">
                                <div className='mt-6'>Lyrics will be played here</div>
                                <div className="pb-12">
                                    <InfiniteRotate>
                                        <Vinyl size={vinylSize} imgUrl={data.trackImage} />
                                    </InfiniteRotate>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-slate-700 opacity-50 my-8 sm:text-2xl">Valentine 2.0</div>
                </div>
            </div>
        </>
    )
}

export default RomanVinyl
