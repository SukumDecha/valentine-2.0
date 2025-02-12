import React from 'react'
import Stack from '../../Stack'
import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Vinyl from '../../Vinyl'
import OliviaProps from './OliviaProps'
import useResponsive from '@/hooks/useResponsive'

const upperProps = [
    '/images/vinyl/olivia/upper-props.png',
]

const lowerProps = [
    '/images/vinyl/olivia/lower-props.png'
]

const OliviaVinyl = () => {
    const { isMobile, isMiniTablet } = useResponsive()

    const stackSize = {
        width: isMobile ? 250 : isMiniTablet ? 300 : 500,
        height: isMobile ? 300 : isMiniTablet ? 350 : 550
    }

    const vinylSize = {
        width: isMobile ? 220 : isMiniTablet ? 300 : 450,
        height: isMobile ? 220 : isMiniTablet ? 300 : 450
    }

    const upperStyle = {
        width: isMobile ? 350 : 500,
    }

    const lowerStyle = {
        width: isMobile ? 350 : 600
    }

    return (
        <>
            <div className='w-full h-screen bg-[#968ECE] overflow-y-scroll overflow-x-hidden mx-auto max-w-xl font-Libre italic px-32'>
                <div className="flex w-full h-full flex-col items-center sm:items-between gap-4 relative">
                    <div className="flex flex-col items-center">
                        <OliviaProps
                            images={upperProps}
                            width={upperStyle.width}
                            height={100}
                            className='z-20' />

                        <div className='text-white text-2xl mt-8 '>
                            Our Memories Playlist
                        </div>

                        <div className="mr-8">
                            <Stack cardDimensions={stackSize} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <OliviaProps
                            images={lowerProps}
                            width={lowerStyle.width}
                            height={150}
                            className='z-20' />

                        <InfiniteRotate>
                            <Vinyl size={vinylSize} />
                        </InfiniteRotate>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OliviaVinyl