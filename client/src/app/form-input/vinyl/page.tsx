'use client'

import React from 'react'
import { motion } from 'framer-motion'
import VinylTemplateForm from './components/VinylTemplateForm'

const FormInputPage = () => {
  return (
    <>
      <div className="animate-gradient flex flex-col justify-center relative min-h-screen overflow-hidden bg-gradient-to-r from-[#E990A3] via-pink-500 to-red-500">
        <div className="p-2 h-full">
          <VinylTemplateForm />
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
