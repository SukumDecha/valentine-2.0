'use client'

import BenzoLanding from '@/components/BenzoLayout/landing/BenzoLanding'
import React, { useState } from 'react'

type TabType = 'memories' | 'message' | 'quiz' | 'time-together' | null

const page = () => {
  const [tab, setTab] = useState<TabType>(null)

  const doChangeTab = (tab: TabType) => {
    setTab(tab)
  }

  return (
    <div>
      <BenzoLanding />
    </div>
  )
}

export default page