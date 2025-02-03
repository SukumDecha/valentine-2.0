import Image from 'next/image'
import React from 'react'
import BenzoButton from '../ui/BenzoButton'

interface IProps {
  imageUrl: string
  url: string
  title: string
}
const BenzoNavgiate = ({ imageUrl, url, title }: IProps) => {
  return (
    <a className='flex flex-col items-center justify-center gap-4' href={url}>
      <div className="-img w-12 h-12 relative bg-pink-200 rounded-full flex items-center justify-center">
        <Image
          src={imageUrl}
          layout='fill'
          objectFit='cover'
          alt='benzo'
          className='mix-blend-multiply'
        />
      </div>

      <BenzoButton className='w-20' >
        <span className='text-sm'>{title}</span>
      </BenzoButton>
    </a>
  )
}


export default BenzoNavgiate