'use client'

import React from 'react'
import VinylTemplateForm from './components/VinylTemplateForm'
import { useVinylFormStore } from '@/stores/vinyl-form.store'
import VinylService from '@/services/vinyl.service'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface IProps {
  uuid: string
}
const FormInputPage = ({ uuid }: IProps) => {
  const form = useVinylFormStore((state) => state.form)
  const clearForm = useVinylFormStore((state) => state.clearForm)
  const router = useRouter()

  const doSubmit = async () => {
    if (!form.track || !form.templateId || !form.images || !form.id) {
      console.log("Error: Please fill all fields")
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }


    toast.promise(
      VinylService.updateUser(form),
      {
        loading: 'กำลังสร้างเว็บไซต์...',
        success: 'สร้างเว็บไซต์สำเร็จ',
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
      }
    )

    clearForm()

    setTimeout(() => {
      router.replace(`/${uuid}`)
    }, 3000)
  }


  return (
    <>
      <div className="animate-gradient relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-r from-[#E990A3] via-pink-500 to-red-500 max-w-2xl mx-auto">
        <div className="h-full p-2 flex flex-col gap-8">
          <h1 className='text-2xl font-Libre italic text-white text-center '>Valentine 2.0</h1>
          <VinylTemplateForm uuid={uuid} />
          <div className='w-fit self-end rounded-md border border-gray-300 py-1 px-[10px] font-Prompt bg-white bg-opacity-75' onClick={doSubmit}>สร้างเว็บไซต์</div>
        </div>
        <style jsx>{`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientAnimation 6s ease infinite;
          }
        `}</style>
      </div>
    </>
  )
}

export default FormInputPage
