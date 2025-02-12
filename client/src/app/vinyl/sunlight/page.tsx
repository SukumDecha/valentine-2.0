'use client'

import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Stack from '@/components/Vinyl/Stack'
import ImageOverlay from '@/components/Vinyl/themes/sunlight/CardStackOverlay'
import SunlightBackground from '@/components/Vinyl/themes/sunlight/SunlightBackground'
import SunlightFlowerOne from '@/components/Vinyl/themes/sunlight/SunlightFlowerOne'
import SunlightFlowerTwo from '@/components/Vinyl/themes/sunlight/SunlightFlowerTwo'
import Vinyl from '@/components/Vinyl/Vinyl'
import React from 'react'

const SunlightVinyl = () => {
  return (
    <div className="font-Libre italic text-[#5B5B5B] antialiased">
      <SunlightBackground>
        <div className="pt-20 text-center text-xl">Our Memories Playlist</div>

        <div className="flex flex-col items-center justify-center gap-20 pb-20 md:h-screen md:flex-row">
          <ImageOverlay
            overlayElements={[
              <div className='z-40 absolute -bottom-14 -left-14'><SunlightFlowerOne width={117*1.5} height={133*1.5}/></div>,
              <div className='z-40 absolute -bottom-14 -right-14'><SunlightFlowerTwo width={117*1.5} height={133*1.5}/></div>,
            ]}
          >
            <Stack cardDimensions={{ width: 300, height: 400 }} />
          </ImageOverlay>

          <div>
            <div className="my-4 text-center">Lyrics will be put here</div>
            <InfiniteRotate>
              <Vinyl size={{ width: 300, height: 300 }} />
            </InfiniteRotate>
          </div>
        </div>

        <div className="pb-20 text-center text-sky-400 opacity-50">Valentine 2.0</div>
      </SunlightBackground>
    </div>
  )
}

export default SunlightVinyl
