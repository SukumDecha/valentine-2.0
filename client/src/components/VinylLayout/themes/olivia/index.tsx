import React from 'react'
import Stack from '../../Stack'
import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Vinyl from '../../Vinyl'
import OliviaProps from './OliviaProps'
import useResponsive from '@/hooks/useResponsive'
import { IUserResponse } from '@/types/vinyl/vinyl'
import SlideIn from '@/components/Shared/animations/dddslideIn'
import SpotifyEmbed from '@/components/Shared/SpotifyEmbed'

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

interface IProps {
    data: IUserResponse
}

const OliviaVinyl = ({ data }: IProps) => {
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
        <div className="flex w-full h-screen flex-col items-center sm:justify-around gap-4 overflow-y-scroll overflow-x-hidden z-[100] p-4 font-Libre italic bg-[#968ECE]">

            {isTablet &&
                <OliviaProps
                    images={upperLgPros}
                    width={1200}
                    height={100}
                    className='z-20' />
            }

            <div className="flex flex-col items-between gap-4 sm:flex-row sm:items-center">
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
                        <Stack cardDimensions={stackSize} cardsData={data.images} />
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
                        <Vinyl size={vinylSize} imgUrl={data.trackImage} />
                    </InfiniteRotate>
                </div>

            </div>

            <SlideIn
                yOffset={'300%'}
                duration={1}
                className="sm:block w-[70vw] sm:w-[600px] mx-auto"
            >
                <SpotifyEmbed trackId={data.trackId as string} />
            </SlideIn>

            <div className="text-center opacity-50 ">Valentine 2.0</div>

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