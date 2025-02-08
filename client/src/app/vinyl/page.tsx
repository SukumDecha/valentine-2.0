'use client'

import InfiniteRotate from '@/components/InfiniteRotate'
import Stack from '@/components/Stack'
import Vinyl from '@/components/Vinyl'

const Page = () => {
  return (
    <>
    <div className='flex flex-col justify-center items-center sm:h-screen mt-20 sm:mt-0'>
      <div className="w-full flex items-center justify-center">
        <div className="flex w-full h-full flex-col items-center justify-center sm:flex-row sm:gap-20">
          <div className='sm:hidden'>Our Memories Playlist</div>
          <Stack cardDimensions={{ width: 380, height: 440 }} />
          <div className="relative flex flex-col items-center gap-10 mt-10">
            <div>Lyrics will be played here</div>
            <InfiniteRotate>
              <Vinyl size={{ width: 300, height: 300 }} />
            </InfiniteRotate>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Page
