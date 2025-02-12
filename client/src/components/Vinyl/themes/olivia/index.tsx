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
    const { isMobile } = useResponsive()

    const upperStyle = {
        width: isMobile ? 350 : 500,
    }

    const lowerStyle = {
        width: isMobile ? 350 : 600
    }

    return (
        <>
            <div className='w-full h-screen bg-[#968ECE] overflow-y-scroll overflow-x-hidden mx-auto max-w-xl font-Libre italic'>
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
                            <Stack cardDimensions={{ width: 300, height: 400 }} />
                        </div>
                    </div>


                    <div className="flex flex-col items-center gap-4">
                        <OliviaProps
                            images={lowerProps}
                            width={lowerStyle.width}
                            height={150}
                            className='z-20' />

                        <InfiniteRotate>
                            <Vinyl size={{ width: 300, height: 300 }} />
                        </InfiniteRotate>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OliviaVinyl