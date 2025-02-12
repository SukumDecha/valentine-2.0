'use client'

import FloatingHearts from '@/components/Vinyl/themes/love/FloatHearth'
import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Stack from '@/components/Vinyl/Stack'
import Vinyl from '@/components/Vinyl/Vinyl'
import useResponsive from '@/hooks/useResponsive'
import SlideIn from '@/components/Shared/animations/SlideIn'
import Image from 'next/image'

const LoveVinyl = () => {
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

                <div className="flex w-full h-[100vh] flex-col sm:flex-row items-center sm:justify-center gap-4 sm:gap-24 overflow-y-scroll overflow-x-hidden z-[100] p-14">
                    <div className="flex flex-col items-center gap-8">

                        <div className="text-2xl font-extralight italic">Our Memories Playlist</div>

                        <div className="relative flex justify-center items-center">
                            <SlideIn xOffset="-300%" className="absolute z-10 right-[150px] bottom-[230px]">
                                <img src="/images/templateLove/libstic.png" />
                            </SlideIn>

                            <SlideIn xOffset='200%'>
                                <Stack cardDimensions={stackSize} />
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
                        <div className="relative italic ">Lyrics will be played here</div>
                        {/* องค์ประกอบที่ใหญ่กว่าหน้าจอ */}
                        <div className="w-full flex justify-center cutinHalf relative">
                            <InfiniteRotate>
                                <Vinyl size={vinylSize} />
                            </InfiniteRotate>
                        </div>
                    </div>

                </div>
            </div >
        </>

    )
}

export default LoveVinyl
