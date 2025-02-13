import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import RenderVinylTemplateList from '../RenderVinylTemplateList'


const SelectTemplateModal = () => {
  return (
    <div>
      <RenderVinylTemplateList />
    </div>
  )
}

export default SelectTemplateModal