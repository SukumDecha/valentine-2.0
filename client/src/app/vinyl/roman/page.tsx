'use client'

import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Stack from '@/components/Vinyl/Stack'
import Vinyl from '@/components/Vinyl/Vinyl'
import FadeIn from '@/components/Shared/animations/FadeIn'

const Page = () => {
  return (
    <>
    <div className="max-w-[433px] mx-auto ">
      <div className="bg-[url('/vinyl/bgBrown.jpg')] libre-baskerville-regular-italic bg-cover p-9 bg-top overflow-auto bg-no-repeat h-screen">
        <div className="w-full flex items-center justify-center">
          <div className="flex w-full h-full flex-col items-center justify-center height">
            <div className="relative">
              <div className="absolute left-[-125px] top-[30px]">
                <img src="/vinyl/armleft.png" alt="armleft" className='w-[145px]' />
              </div>
              <div className="absolute right-[-125px] top-[-30px]">
                <img src="/vinyl/armright.png" alt="right" />
              </div>
              <FadeIn>
                <p className="text-[20px] text-[#5B5B5B] libre-baskerville-regular-italic mt-14">Our Memories Playlist</p>
              </FadeIn>
            </div>
            <div className="mt-14 relative">
              <div className="absolute left-[-30px] top-[300px] z-50">
                <img src="/vinyl/kid.png" alt="armleft" />
              </div>
              <div className="absolute right-[-76px] top-[250px] z-50">
                <img src="/vinyl/rose.png" alt="right" />
              </div>
              <Stack cardDimensions={{ width: 280, height: 340 }} />
            </div>
            <div className="relative flex flex-col items-center gap-10 mt-10">
              <div className='mt-6'>Lyrics will be played here</div>
              <div className="pb-12">
                <InfiniteRotate>
                  <Vinyl size={{ width: 250, height: 250 }} />
                </InfiniteRotate>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Page
