'use client'

import FloatingHearts from '@/components/FloatHearth'
import InfiniteRotate from '@/components/Shared/animations/InfiniteRotate'
import Stack from '@/components/Vinyl/Stack'
import Vinyl from '@/components/Vinyl/Vinyl'
import { motion } from "framer-motion";
const Page = () => {

  return (
    <>
  <div className="font-Libre italic relative  flex flex-col items-center bg-pink-200 h-screen overflow-x-hidden bg-cover bg-center" 
    // style={{ backgroundImage: "url('/images/templateLove/bg-ping.png')" }}
    >
      <FloatingHearts/>

    <div className="w-full mt-5 flex items-center justify-center flex-1">
      <div className="flex w-full flex-col items-center gap-8 justify-center sm:flex-row sm:gap-20">
        
        <div className="sm:hidden relative text-2xl font-extralight italic  mt-10">Our Memories Playlist</div>

        <div className="relative flex justify-center items-center">
            <motion.div 
            initial={{ x: "-300%" }}
            animate={{ x: 1 }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute z-10 right-[150px] bottom-[230px]" >
                <img src="/images/templateLove/libstic.png"/>
            </motion.div>
            
            <motion.div className="relative" 
            initial={{ x: "200%" }}
            animate={{ x: 1 }} 
            transition={{ duration: 0.5, ease: "easeOut" }} >
                <Stack cardDimensions={{ width: 280, height: 340 }} />
            </motion.div>

            <img src="/images/templateLove/hearth.png" className="absolute z-10 left-[200px] top-[250px] animate-bounce" />
        </div>


        {/* กล่องที่มีเนื้อหาเกินขอบเขต */}
        <div className="relative mt-16 flex flex-col items-center gap-10 sm:gap-20 w-full flex-1 overflow-visible">
          <div className="relative italic ">Lyrics will be played here</div>

          {/* องค์ประกอบที่ใหญ่กว่าหน้าจอ */}
          <div className="w-full flex justify-center cutinHalf relative">
            <InfiniteRotate>
              <Vinyl size={{ width: 350, height: 350 }} />
            </InfiniteRotate>
          </div>
        </div>

      </div>
    </div>
  </div>
</>

  )
}

export default Page
