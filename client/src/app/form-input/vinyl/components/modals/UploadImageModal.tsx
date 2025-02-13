import { ImageUpload } from '@/app/form-input/components/ImageUpload'
import React from 'react'

interface IProps {
  uuid_slug: string
}
const UploadImageModal = ({ uuid_slug }: IProps) => {
  return (
    <div>
      <ImageUpload uuid_slug={uuid_slug} />
    </div>
  )
}

export default UploadImageModal