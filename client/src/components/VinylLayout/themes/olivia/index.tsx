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

const upperLgPros = [
    '/images/vinyl/olivia/upper-props-lg.png'
]

const lowerLgProps = [
    '/images/vinyl/olivia/lower-props-lg.png'
]

const OliviaVinyl = () => {
    const { isMobile, isMiniTablet, isTablet } = useResponsive()

    const stackSize = {
        width: isMobile ? 250 : isMiniTablet ? 300 : 500,
        height: isMobile ? 300 : isMiniTablet ? 350 : 550
    }

    const vinylSize = {
        width: isMobile ? 220 : isMiniTablet ? 300 : 450,
        height: isMobile ? 220 : isMiniTablet ? 300 : 450
    }

    const upperStyle = {
        width: isMobile ? 350 : 300,
    }

    const lowerStyle = {
        width: isMobile ? 350 : 300
    }

    return (
        <div className="flex w-full h-screen flex-col items-center sm:justify-around gap-4 sm:gap-24 overflow-y-scroll overflow-x-hidden z-[100] p-4 font-Libre italic bg-[#968ECE]">

            {isTablet &&
                <OliviaProps
                    images={upperLgPros}
                    width={1200}
                    height={100}
                    className='z-20' />
            }

            <div className="flex flex-col items-between gap-4 sm:flex-row">
                <div className="flex flex-col items-center">
                    {isMobile &&
                        <OliviaProps
                            images={upperProps}
                            width={upperStyle.width}
                            height={100}
                            className='z-20' />
                    }

                    <div className='text-white text-2xl mt-8 '>
                        Our Memories Playlist
                    </div>

                    <div className="mr-8">
                        <Stack cardDimensions={stackSize} />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    {
                        isMobile &&
                        <OliviaProps
                            images={lowerProps}
                            width={lowerStyle.width}
                            height={150}
                            className='z-20' />
                    }

                    <InfiniteRotate>
                        <Vinyl size={vinylSize} />
                    </InfiniteRotate>
                </div>

                <div className="text-center opacity-50 mt-16">Valentine 2.0</div>
            </div>

            {
                isTablet &&
                <OliviaProps
                    images={lowerLgProps}
                    width={1200}
                    height={150}
                    className='z-20' />
            }


        </div>
    )
}

export default OliviaVinyl