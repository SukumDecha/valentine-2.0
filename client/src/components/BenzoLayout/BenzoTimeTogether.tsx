"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import BenzoTimeSpentService from "@/services/benzo/benzo.time-spent.service"

const BenzoTimeTogether = () => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [timeTogether, setTimeTogether] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const doGetTimeSpent = async () => {
            const response = await BenzoTimeSpentService.getTimeSpent("uuid")
            setStartDate(response)
        }

        doGetTimeSpent()
    }, [])

    useEffect(() => {
        const updateTime = () => {
            if (!startDate) return

            const now = new Date()
            const difference = now.getTime() - startDate.getTime()

            const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))
            const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
            const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((difference % (1000 * 60)) / 1000)

            setTimeTogether({ years, months, days, hours, minutes, seconds })
        }

        updateTime()
        const timer = setInterval(updateTime, 1000)

        return () => clearInterval(timer)
    }, [startDate])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center"
        >
            <h2 className="text-2xl font-bold mb-4 text-red-600">Time Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-pink-100 p-4 rounded-lg">
                    <p className="text-4xl font-bold">{timeTogether.years}</p>
                    <p>Years</p>
                </div>
                <div className="bg-pink-100 p-4 rounded-lg">
                    <p className="text-4xl font-bold">{timeTogether.months}</p>
                    <p>Months</p>
                </div>
                <div className="bg-pink-100 p-4 rounded-lg">
                    <p className="text-4xl font-bold">{timeTogether.days}</p>
                    <p>Days</p>
                </div>
                <div className="bg-pink-100 p-4 rounded-lg">
                    <p className="text-4xl font-bold">{timeTogether.hours}</p>
                    <p>Hours</p>
                </div>
                <div className="bg-pink-100 p-4 rounded-lg">
                    <p className="text-4xl font-bold">{timeTogether.minutes}</p>
                    <p>Minutes</p>
                </div>
                <div className="bg-pink-100 p-4 rounded-lg">
                    <p className="text-4xl font-bold">{timeTogether.seconds}</p>
                    <p>Seconds</p>
                </div>
            </div>
            <Link href="/" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                Back to Home
            </Link>
        </motion.div>
    )
}

export default BenzoTimeTogether

