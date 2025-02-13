import React, { useEffect } from 'react'
import RenderStepMenu, { StepMenu } from '../../components/RenderStepMenu'
import SelectSongModal from './modals/SelectSongModal'
import SelectTemplateModal from './modals/SelectTemplateModal'
import UploadImageModal from './modals/UploadImageModal'
import { useVinylFormStore } from '@/stores/vinyl-form.store'

interface IProps {
  uuid: string
}
const VinylTemplateForm = ({ uuid }: IProps) => {
  const { form } = useVinylFormStore()

  const setId = useVinylFormStore((state) => state.setId)

  useEffect(() => {
    setId(uuid)
  }, [uuid])

  const steps: StepMenu[] = [
    { key: '#1', label: 'เลือกเพลงโปรดของคุณ', selectedValue: form.track?.trackName, modalContent: <SelectSongModal /> },
    { key: '#2', label: 'เลือกเทมเพลต', selectedValue: form.templateId, modalContent: <SelectTemplateModal /> },
    { key: '#3', label: 'อัพโหลดรูปภาพ', selectedValue: form.images, modalContent: <UploadImageModal uuid_slug={uuid} /> },
  ]

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <RenderStepMenu steps={steps} />
    </div>
  )
}

export default VinylTemplateForm
