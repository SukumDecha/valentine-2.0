"use client"

import type React from "react"
import { useState } from "react"
import { Radio, Button, Progress } from "antd"
import type { RadioChangeEvent } from 'antd' // Add this import
import { IconHeart } from "@tabler/icons-react"
import BenzoButton from "./ui/BenzoButton"

// Custom Valentine's theme colors
const theme = {
    primary: "#FF69B4", // Hot Pink
    secondary: "#FF1493", // Deep Pink
    accent: "#FF6347", // Tomato
}

// Quiz questions
const questions = [
    {
        question: "What's the most popular flower on Valentine's Day?",
        options: ["Rose", "Tulip", "Lily", "Daisy"],
        answer: "Rose",
    },
    {
        question: "In which century did Valentine's Day begin to be celebrated?",
        options: ["14th century", "15th century", "16th century", "17th century"],
        answer: "15th century",
    },
    {
        question: "What is the traditional color of love?",
        options: ["Blue", "Green", "Red", "Purple"],
        answer: "Red",
    },
    {
        question: "Which Roman god is associated with Valentine's Day?",
        options: ["Jupiter", "Mars", "Cupid", "Venus"],
        answer: "Cupid",
    },
    {
        question: "What is the estimated number of Valentine's Day cards exchanged annually?",
        options: ["100 million", "500 million", "1 billion", "2 billion"],
        answer: "1 billion",
    },
]

const BenzoQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)

    const handleAnswer = (e: RadioChangeEvent) => {
        setSelectedAnswer(e.target.value)
    }

    const handleSubmit = () => {
        if (selectedAnswer === questions[currentQuestion].answer) {
            setScore(score + 1)
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer("")
        } else {
            setShowResult(true)
        }
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setSelectedAnswer("")
        setScore(0)
        setShowResult(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-benzo-quiz bg-cover bg-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {!showResult ? (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: theme.primary }}>
                            Valentine's Day Quiz
                        </h1>
                        <Progress
                            percent={(currentQuestion / questions.length) * 100}
                            showInfo={false}
                            strokeColor={theme.secondary}
                        />
                        <div className="my-6">
                            <h2 className="text-xl mb-4" style={{ color: theme.primary }}>
                                {questions[currentQuestion].question}
                            </h2>
                            <Radio.Group onChange={handleAnswer} value={selectedAnswer} className="flex flex-col gap-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <Radio
                                        key={index}
                                        value={option}
                                        className="text-lg p-2 rounded transition-all duration-200 hover:bg-pink-50"
                                        style={{
                                            borderColor: theme.secondary,
                                            color: theme.primary,
                                        }}
                                    >
                                        {option}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                        <BenzoButton 
                            variant="secondary"
                            className="w-full h-12 text-lg font-semibold rounded-full"
                            disabled={!selectedAnswer}
                            onClick={handleSubmit}
                        >
                            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                        </BenzoButton>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>
                            Quiz Completed!
                        </h2>
                        <p className="text-xl mb-4">
                            Your score: {score} out of {questions.length}
                        </p>
                        <IconHeart className="text-6xl mb-4" style={{ color: theme.accent }} />
                        <div className="flex flex-col items-center gap-4">
                            <BenzoButton
                                onClick={restartQuiz}
                                className="w-3/5 h-12 text-lg font-semibold rounded-full"
                            >
                                Restart Quiz
                            </BenzoButton>
                            <BenzoButton 
                                variant="secondary" 
                                className="w-3/5 h-12 text-lg font-semibold rounded-full"
                            >
                                Back to home
                            </BenzoButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BenzoQuiz