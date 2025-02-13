'use client'

import React from 'react'
import { motion } from 'framer-motion'
import VinylTemplateForm from './components/VinylTemplateForm'

const FormInputPage = () => {
  return (
    <>
      <div className="animate-gradient relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-r from-[#E990A3] via-pink-500 to-red-500">
        <div className="h-full p-2 flex flex-col gap-8">
          <h1 className='text-2xl font-Libre italic text-white text-center '>Valentine 2.0</h1>
          <VinylTemplateForm />
          <div className='w-fit self-end rounded-md border border-gray-300 py-1 px-[10px] font-Prompt bg-white bg-opacity-75'>สร้างเว็บไซต์</div>
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
