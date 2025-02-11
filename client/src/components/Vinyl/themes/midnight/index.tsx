'use client'

import InfiniteRotate from "@/components/Shared/animations/InfiniteRotate"
import Stack from "../../Stack"
import Vinyl from "../../Vinyl"
import MidNightLayout from "./MidNightLayout"

const MidNightVinylTheme = () => {
    return (
        <MidNightLayout>
            <div className="flex flex-col items-center">
                <div className='sm:hidden text-white text-2xl mb-4'>
                    Our Memories Playlist
                </div>

                <Stack cardDimensions={{ width: 300, height: 400 }} />
            </div>



            <div className="relative flex flex-col items-center gap-10 mt-10 z-100">
                <InfiniteRotate>
                    <Vinyl size={{ width: 300, height: 300 }} />
                </InfiniteRotate>
            </div>
        </MidNightLayout>

    )
}

export default MidNightVinylTheme