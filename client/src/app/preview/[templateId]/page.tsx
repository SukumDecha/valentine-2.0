'use client'

import PreviewWrapper from '@/components/Preview/PreviewWrapper'
import Vinyl from '@/components/VinylLayout'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const { templateId }: {templateId: string} = useParams()

  return (
    <div>
      <PreviewWrapper>
        <Vinyl template={templateId} data={{
          success: true,
          images: [],
          message: '',
        }}  />
      </PreviewWrapper>
    </div>
  )
}

export default page
