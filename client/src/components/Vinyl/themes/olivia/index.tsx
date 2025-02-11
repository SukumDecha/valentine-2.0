import React, { CSSProperties } from 'react'
import Stack from '../../Stack'
import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Vinyl from '../../Vinyl'
import OliviaProps from './OliviaProps'

const upperProps = [
    '/images/vinyl/olivia/upper-props.png',
]

const lowerProps = [
    '/images/vinyl/olivia/lower-props.png'
]

const OliviaVinylTheme = () => {
    // const { isTable } = useResponsive()

    return (
        <>
            <div className='w-full h-screen bg-[#968ECE] overflow-y-scroll overflow-x-hidden mx-auto'>
                <div className="flex w-full h-full flex-col sm:flex-row items-center gap-4 relative">
                    <div className="flex flex-col items-center">
                        <OliviaProps
                            images={upperProps}
                            width={400}
                            height={100}
                            className='z-20' />

                        <div className='text-white text-2xl mt-4 '>
                            Our Memories Playlist
                        </div>

                        <Stack cardDimensions={{ width: 300, height: 400 }} />

                    </div>



                    <div className="flex flex-col items-center gap-4">

                        <InfiniteRotate>
                            <Vinyl size={{ width: 300, height: 300 }} />
                        </InfiniteRotate>

                        <OliviaProps
                            images={lowerProps}
                            width={400}
                            height={150}
                            className='z-20' />

                    </div>

                </div>
            </div>
        </>
    )
}

export default OliviaVinylTheme