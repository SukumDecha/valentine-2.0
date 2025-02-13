import React, { useEffect } from 'react'
import RenderStepMenu, { StepMenu } from '../../components/RenderStepMenu'
import SelectSongModal from './modals/SelectSongModal'
import SelectTemplateModal from './modals/SelectTemplateModal'
import UploadImageModal from './modals/UploadImageModal'
import { useVinylFormStore } from '@/stores/vinyl-form.store'



const VinylTemplateForm = () => {
  const {form} = useVinylFormStore()


  const steps: StepMenu[] = [
    {key: '#1', label: 'เลือกเพลงโปรดของคุณ', selectedValue:form.track?.trackName, modalContent: <SelectSongModal />},
    {key: '#2', label: 'เลือกเทมเพลต', selectedValue: form.templateId, modalContent: <SelectTemplateModal />},
    {key: '#3', label: 'อัพโหลดรูปภาพ', modalContent: <UploadImageModal />},
  ]
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <RenderStepMenu steps={steps}/>
    </div>
  )
}

export default VinylTemplateForm
