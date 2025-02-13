'use client'

import FloatingHearts from '@/components/VinylLayout/themes/love/FloatHearth'
import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Stack from '@/components/VinylLayout/Stack'
import Vinyl from '@/components/VinylLayout/Vinyl'
import useResponsive from '@/hooks/useResponsive'
import Image from 'next/image'
import SlideIn from '@/components/Shared/animations/SlideIn'
import { IUserResponse } from '@/types/vinyl/vinyl'
import SpotifyEmbed from '@/components/Shared/SpotifyEmbed'

interface IProps {
    data: IUserResponse
}

const LoveVinyl = ({ data }: IProps) => {
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
            <div className="font-Libre italic relative flex flex-col items-center bg-pink-200 h-screen overflow-hidden bg-cover bg-center"
            >
                <FloatingHearts />

                <div className="w-full h-screen overflow-y-scroll overflow-x-hidden z-[100] p-14 my-auto sm:flex sm:flex-col sm:justify-center sm:items-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-24">
                        <div className="flex flex-col items-center gap-8">

                            <div className="text-2xl font-extralight italic sm:text-lg md:text-2xl">Our Memories Playlist</div>

                            <div className="relative flex justify-center items-center ">
                                <SlideIn xOffset="-300%" className="absolute z-10 inset-0 -top-8 -left-8 sm:-top-16 sm:-left-4 w-24 h-24 sm:w-52 sm:h-52">
                                    <img src="/images/templateLove/libstic.png" />
                                </SlideIn>

                                <SlideIn xOffset='200%'>
                                    <Stack cardDimensions={stackSize} cardsData={data.images} />
                                </SlideIn>

                                <SlideIn xOffset='300%' className="absolute z-10 right-[-32px] bottom-[-48px] w-20 h-20 sm:w-28 sm:h-28">
                                    <Image
                                        src="/images/templateLove/hearth.png"
                                        className="animate-bounce"
                                        width={150}
                                        height={150}
                                        alt='heart' />
                                </SlideIn>
                            </div>
                        </div>


                        {/* กล่องที่มีเนื้อหาเกินขอบเขต */}
                        <div className="relative flex flex-col items-center gap-10 mt-10 z-100">
                            <div className="relative italic sm:text-lg md:text-2xl">Song for you</div>
                            {/* องค์ประกอบที่ใหญ่กว่าหน้าจอ */}
                            <div className="w-full flex justify-center cutinHalf relative">
                                <InfiniteRotate>
                                    <Vinyl size={vinylSize} imgUrl={data.trackImage} />
                                </InfiniteRotate>
                            </div>
                        </div>
                    </div>

                    <SlideIn
                        yOffset={'300%'}
                        duration={1}
                        className="sm:block w-[70vw] sm:w-[600px] mx-auto mt-8"
                    >
                        <SpotifyEmbed trackId={data.trackId as string} />
                    </SlideIn>

                </div>

                <div className="text-center opacity-50 my-8 text-2xl">Valentine 2.0</div>
            </div >
        </>

    )
}

export default LoveVinyl
