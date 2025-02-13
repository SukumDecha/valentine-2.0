import Image from 'next/image';
import React from 'react'

type Props = {
  width: number;
  height: number;
}

const SunlightFlowerTwo = ({width, height}: Props) => {
  return (  
    <Image draggable="false" src='/images/vinyl/sunlight/flower-2.png' alt='flower' width={width} height={height} />
  )
}

export default SunlightFlowerTwo