import React from 'react'
import RenderStepMenu, { StepMenu } from '../../components/RenderStepMenu'
import SelectSongModal from './modals/SelectSongModal'
import SelectTemplateModal from './modals/SelectTemplateModal'
import UploadImageModal from './modals/UploadImageModal'

const steps: StepMenu[] = [
  {key: '#1', label: 'เลือกเพลงโปรดของคุณ', modalContent: <SelectSongModal />},
  {key: '#2', label: 'เลือกเทมเพลต', modalContent: <SelectTemplateModal />},
  {key: '#3', label: 'อัพโหลดรูปภาพ', modalContent: <UploadImageModal />},
]

const VinylTemplateForm = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <RenderStepMenu steps={steps}/>
    </div>
  )
}

export default VinylTemplateForm
