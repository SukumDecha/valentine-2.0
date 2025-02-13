
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd'
import { useVinylFormStore } from '@/stores/vinyl-form.store'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const renderCheckmark = (selectedValue?: any) => {
  console.log("Selected Value: ", selectedValue)
  if (Array.isArray(selectedValue)) {
    if (selectedValue.length > 0) {
      return <CheckCircleOutlined className="text-green-500" />
    } else {
      return <CloseCircleOutlined className="text-red-500" />
    }
  }
  if (selectedValue) {
    return <CheckCircleOutlined className="text-green-500" />
  }

  return <CloseCircleOutlined className="text-red-500" />
}

export interface StepMenu {
  key: string
  label: string
  selectedValue?: string | any
  modalContent: React.ReactNode
}

interface Props {
  steps: StepMenu[]
}

const RenderStepMenu = ({ steps }: Props) => {
  const [selectedStep, setSelectedStep] = useState<StepMenu | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { form } = useVinylFormStore()

  useEffect(() => {
    setIsModalOpen(false)
  }, [form.track])

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
            <div className="flex items-center justify-end gap-2">
              {
                typeof step.selectedValue !== 'object' &&
                <span>{step.selectedValue}</span>
              }
              {renderCheckmark(step.selectedValue)}
            </div>
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
