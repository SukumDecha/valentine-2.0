'use client'

import BenzoLanding from '@/components/BenzoLayout/landing/BenzoLanding'
import ClickSpark from '@/components/Shared/libraries/ClickSpark'
import React, { useState } from 'react'

type TabType = 'memories' | 'message' | 'quiz' | 'time-together' | null

const page = () => {
  return (
    <div>
      <BenzoLanding />
    </div>
  )
}

export default page