import Image from 'next/image';
import React from 'react'

type Props = {
  width: number;
  height: number;
}

const SunlightFlowerOne = ({width, height}: Props) => {
  return (  
    <Image draggable="false" src='/images/vinyl/sunlight/flower-1.png' alt='flower' width={width} height={height} />
  )
}

export default SunlightFlowerOne