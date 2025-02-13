"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button, message } from "antd"
import Image from "next/image"
import confetti from "canvas-confetti"

interface Step {
    image: string
    text: string
}

interface GirlfriendProposalProps {
    steps: Step[]
}

const GirlfriendProposal: React.FC<GirlfriendProposalProps> = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleYes = () => {
        message.success("Yay! 🎉")
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        })
    }

    const handleNo = () => {
        const x = Math.random() * (window.innerWidth - 100)
        const y = Math.random() * (window.innerHeight - 40)
        setNoButtonPosition({ x, y })
    }

    useEffect(() => {
        const handleResize = () => {
            if (currentStep === steps.length - 1) {
                handleNo()
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [currentStep, steps.length, handleNo]) // Added handleNo to dependencies

    if (currentStep === steps.length - 1) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
                <h1 className="text-4xl font-bold mb-8 text-white">Would you be my girlfriend?</h1>
                <div className="space-y-4">
                    <Button type="primary" size="large" onClick={handleYes} className="w-40">
                        Yes
                    </Button>
                    <Button
                        danger
                        size="large"
                        style={{
                            position: "absolute",
                            left: noButtonPosition.x,
                            top: noButtonPosition.y,
                            transition: "all 0.2s ease-in-out",
                        }}
                        onClick={handleNo}
                        className="w-40"
                    >
                        No
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-4"
            onClick={handleNextStep}
        >
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 cursor-pointer">
                <Image
                    src={steps[currentStep].image || "/placeholder.svg"}
                    alt={`Step ${currentStep + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-xl text-center text-gray-800">{steps[currentStep].text}</p>
                <p className="text-sm text-center text-gray-500 mt-4">Tap to continue</p>
            </div>
        </div>
    )
}

export default GirlfriendProposal

