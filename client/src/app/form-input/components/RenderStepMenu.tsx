import React, { useState } from 'react'
import { Modal, Button } from 'antd'

export interface StepMenu {
  key: string
  label: string
  selectedValue?: string
  modalContent: React.ReactNode
}

interface Props {
  steps: StepMenu[]
}

const RenderStepMenu = ({ steps }: Props) => {
  const [selectedStep, setSelectedStep] = useState<StepMenu | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMenuClick = (key: string) => {
    setSelectedStep(steps.find((step) => step.key === key) || null)
    setIsModalOpen(true)
  }

  return (
    <div className="flex w-full flex-col gap-3 font-Prompt">
      {steps.map((step) => (
        <div
          key={step.key}
          className="flex cursor-pointer items-center rounded-md border border-gray-300 p-[10px] bg-white bg-opacity-75"
          onClick={() => handleMenuClick(step.key)}
        >
          <span className="mr-2">{step.key}</span>
          <div className='w-full flex justify-between'>
            <span>{step.label}</span>
            <span>{step.selectedValue}</span>
          </div>
        </div>
      ))}

      <Modal
        title={selectedStep?.label}
        open={isModalOpen}
        className="font-Prompt"
        onCancel={() => setIsModalOpen(false)}
        footer={
          <Button type="primary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        }
      >
        {selectedStep?.modalContent}
      </Modal>
    </div>
  )
}

export default RenderStepMenu
