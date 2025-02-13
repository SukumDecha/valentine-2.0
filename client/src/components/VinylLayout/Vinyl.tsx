import Image from 'next/image'
import React from 'react'

type Props = {
  size: {
    width: number;
    height: number;
  }
  imgUrl?: string;
}

const Vinyl = ({ size, imgUrl }: Props) => {
  return (
    <div>
      <div className='relative' style={{ width: size.width, height: size.height }}>
        <Image draggable="false" className='absolute top-0 left-0 z-10' src={'/Vinyl.png'} alt='Vinyl' width={size.width} height={size.height} />
        <Image draggable="false" className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src={imgUrl || '/images.jpg'} alt='image' width={Math.floor(size.width / 2)} height={Math.floor(size.height / 2)} />
      </div>
    </div>
  )
}

export default Vinyl