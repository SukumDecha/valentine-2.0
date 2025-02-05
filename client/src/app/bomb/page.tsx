import React from 'react'
import PolaroidPhoto from '../components/bomb/Polaroid'
import SpotifyEmbed from '../components/bomb/SpotifyEmbed'

const UploadPage = () => {
  return (
    <div className='bg-gradient-to-r from-red-500 to-pink-600 flex flex-col items-center p-4 text-sm/4 gap-10 h-auto text-white'>
      <div className='space-y-2 max-w-5xl w-full'>
        <h1 className='text-lg font-bold text-center'>Happy Valentien's Day</h1>
        <p className='font-medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi voluptatum quo, praesentium ducimus doloribus voluptates aliquid. Expedita, quia? Eveniet dolorum sed error blanditiis commodi quia nesciunt eligendi praesentium soluta tempora.</p>
      </div>
      <SpotifyEmbed trackId="7GXcuBE3Aiu8gUJjX8PSlV?si=1b1c7326a0334eb9" />
      <PolaroidPhoto imageSrc='/test.png' />
      <button className='px-6 py-2 bg-gradient-to-r from-[#FF3334] to-[#FFDEE3] rounded-lg text-base font-bold transition-colors duration-300 ease-in-out
      '>Download</button>
    </div>
  )

}

export default UploadPage
