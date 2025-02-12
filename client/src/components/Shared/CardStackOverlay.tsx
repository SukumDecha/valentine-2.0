import React from 'react'

type Props = {
  children: React.ReactNode;
  overlayElements: React.ReactNode[];
}

const ImageOverlay = ({ children, overlayElements }: Props) => {
  return (
    <div className="relative h-fit w-fit">
      {
        ...overlayElements
      }
      <div className='z-30'>{children}</div>
    </div>
  )
}

export default ImageOverlay
