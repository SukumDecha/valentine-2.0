import { useVinylFormStore } from '@/stores/vinyl-form.store'
import { IComponentProps } from '@/types/component'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const PreviewWrapper = ({ children }: IComponentProps) => {
  const { templateId }: { templateId: string } = useParams()
  const { form, setTemplateId } = useVinylFormStore()
  const router = useRouter()


  const backToInputForm = () => {
    router.replace(`/${form.id}`)
  }

  const submitButtonHandler = () => {
    setTemplateId(templateId)
    router.replace(`/${form.id}`)
  }

  return (
    <div className="relative">
      <div className="absolute bottom-20 z-[1000] flex justify-center w-full gap-[50%] font-Prompt text-xl">
        <button type='button' onClick={backToInputForm} className="bg-red-400 py-1 px-4 rounded-md text-white text-base">Back</button>
        <button type='button' onClick={submitButtonHandler} className="bg-green-400 py-1 px-4 rounded-md text-base">Submit</button>
      </div>
      <div>
        {children}
      </div>

    </div>
  )
}

export default PreviewWrapper
