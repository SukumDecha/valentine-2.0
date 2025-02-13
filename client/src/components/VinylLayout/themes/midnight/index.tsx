'use client'

import InfiniteRotate from "@/components/Shared/animations/InfiniteRotate"
import Stack from "../../Stack"
import Vinyl from "../../Vinyl"
import MidNightLayout from "./MidNightLayout"
import ImageOverlay from "@/components/Shared/CardStackOverlay"
import Image from "next/image"
import useResponsive from "@/hooks/useResponsive"
import SlideIn from "@/components/Shared/animations/SlideIn"
import { IUserResponse } from "@/types/vinyl/vinyl"
import SpotifyEmbed from "@/components/Choose/SpotifyEmbed"

interface IProps {
    data: IUserResponse
}

const MidNightVinyl = ({ data }: IProps) => {
    const { isMobile, isMiniTablet } = useResponsive()

    const stackSize = {
        width: isMobile ? 250 : isMiniTablet ? 300 : 500,
        height: isMobile ? 300 : isMiniTablet ? 350 : 550
    }

    const vinylSize = {
        width: isMobile ? 220 : isMiniTablet ? 300 : 450,
        height: isMobile ? 220 : isMiniTablet ? 300 : 450
    }

    const overlayStyle = {
        bottom: isMobile ? '-5rem' : isMiniTablet ? '-7rem' : '-9rem',
        left: isMobile ? '-3.5rem' : '-5rem'
    }

    const blueFlowerStyle = {
        width: isMobile ? 250 : isMiniTablet ? 350 : 450,
        height: isMobile ? 250 : isMiniTablet ? 350 : 500,
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
        <MidNightLayout>
            <SlideIn xOffset={stackStyle.xOffset} yOffset={stackStyle.yOffset} duration={1}>
                <div className="flex flex-col items-center">
                    <div className='sm:hidden text-white text-2xl mb-4'>
                        Our Memories Playlist
                    </div>

                    <Stack cardDimensions={stackSize} cardsData={data.images} />
                </div>
            </SlideIn>

            <SlideIn xOffset={vinylStyle.xOffset} yOffset={vinylStyle.yOffset} duration={1}>
                <div className="relative flex flex-col items-center gap-10 mt-10 z-100">
                    <ImageOverlay
                        overlayElements={[
                            <div className='z-40 absolute' style={overlayStyle}>
                                <Image
                                    src="/images/vinyl/midnight/blue-flower.png"
                                    alt="blue-flower"
                                    width={blueFlowerStyle.width}
                                    height={blueFlowerStyle.height}
                                    className="object-contain"
                                    draggable={false}
                                />
                            </div>
                        ]}
                    >
                        <InfiniteRotate>
                            <Vinyl size={vinylSize} imgUrl={data.trackImage} />
                        </InfiniteRotate>
                    </ImageOverlay>
                </div>
            </SlideIn>
        </MidNightLayout>

    )
}

export default MidNightVinyl