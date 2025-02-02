import React from 'react'
import PolaroidPhoto from '../components/Polaroid'

const UploadPage = () => {
  return (
    <div className='p-8 flex flex-col items-center gap-4 h-screen bg-slate-600 text-white overflow-scroll'>
      <h1>I love you so much</h1>
      <PolaroidPhoto imageSrc='/test.png' />
    </div>
  )
}

export default UploadPage
