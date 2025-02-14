'use client'

import PreviewWrapper from '@/components/Preview/PreviewWrapper'
import Vinyl from '@/components/VinylLayout'
import { useVinylFormStore } from '@/stores/vinyl-form.store'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const { templateId }: { templateId: string } = useParams()
  const formData = useVinylFormStore((state) => state.form)

  return (
    <div>
      <PreviewWrapper>
        <Vinyl template={templateId} data={{
          success: true,
          images: formData.images,
          description: formData.description,
          trackId: formData.track?.trackId,
          trackImage: formData.track?.trackImage,
          message: '',
        }} />
      </PreviewWrapper>
    </div>
  )
}

export default page
