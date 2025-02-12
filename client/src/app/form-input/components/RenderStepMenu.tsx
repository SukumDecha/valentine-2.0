import React, { SetStateAction, useState } from "react";
import { Modal, Button } from "antd";

export interface StepMenu {
  key: string,
  label: string,
  modalContent: React.ReactNode
}

interface Props {
  steps?: StepMenu[]
}

const mockupSteps: StepMenu[] = [
  {key: '#1', label: 'text', modalContent: <h1>Hello</h1>},
  {key: '#2', label: 'text', modalContent: <h1>Hi</h1>}
]

const RenderStepMenu = ({ steps = mockupSteps }: Props) => {
  const [selectedStep, setSelectedStep] = useState<StepMenu | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = (key: string) => {
    setSelectedStep((steps.find((step) => step.key === key) || null));
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-3 w-full font-Prompt">
      {steps.map((step) => (
        <div
          key={step.key}
          className="flex items-center p-[10px] border border-gray-300 rounded-md cursor-pointer"
          onClick={() => handleMenuClick(step.key)}
        >
          <span className="mr-2">{step.key}</span>
          {step.label}
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
  );
};

export default RenderStepMenu;
