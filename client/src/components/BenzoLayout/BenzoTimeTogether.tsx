"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import BenzoService from "@/services/benzo.service"
import { IBenzoTimeSpent } from "@/types/benzo/time-spent"
import Image from "next/image"
import BenzoButton from "./ui/BenzoButton"
import CountUp from "../Shared/libraries/CountUp"
import AnimatedContent from "../Shared/libraries/AnimatedContent"
import FadeIn from "../Shared/animations/FadeIn"

const BenzoTimeTogether = () => {
    const [data, setData] = useState<IBenzoTimeSpent | undefined>(undefined)
    const [timeTogether, setTimeTogether] = useState({ ปี: 0, เดือน: 0, วัน: 0, ชั่วโมง: 0, นาที: 0, วินาที: 0 })

    useEffect(() => {
        const doGetData = async () => {
            const data = await BenzoService.getTimeSpentData("uuid")
            setData(data)
        }
        doGetData()
    }, [])

    useEffect(() => {
        const updateTime = () => {
            if (!data?.startDate) return

            const startDate = new Date(data.startDate)
            const now = new Date()
            const difference = now.getTime() - startDate.getTime()

            const ปี = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))
            const เดือน = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
            const วัน = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
            const ชั่วโมง = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const นาที = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const วินาที = Math.floor((difference % (1000 * 60)) / 1000)

            setTimeTogether({ ปี, เดือน, วัน, ชั่วโมง, นาที, วินาที })
        }

        updateTime()
        const timer = setInterval(updateTime, 1000)
        return () => clearInterval(timer)
    }, [data])

    console.log("Data", data)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-benzo-time-together bg-cover bg-center w-full min-h-screen mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center"
            style={{ backgroundSize: "cover", imageRendering: "pixelated" }}
        >
            {data?.imageUrl && (
                <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md aspect-[4/3]">
                    <Image
                        src={data.imageUrl as string}
                        alt="Time Together"
                        className="rounded-lg shadow-md"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}
            <div className="md:w-2/3 text-center md:text-left md:ml-6">
                <AnimatedContent
                    distance={150}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 80, friction: 20 }}
                    initialOpacity={0.2}
                    animateOpacity
                    scale={1.1}
                    threshold={0.8}
                >
                    <h2 className="text-2xl font-bold mb-4 text-red-600">เวลาที่เราอยู่ด้วยกัน </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {Object.entries(timeTogether).map(([key, value]) => (
                            <div key={key} className="bg-pink-100 p-4 rounded-lg">
                                <p className="text-xl md:text-3xl font-bold">
                                    <CountUp
                                        from={0}
                                        to={value}
                                        separator=","
                                        direction="up"
                                        duration={1}
                                        className="count-up-text"
                                    />
                                </p>
                                <p className="capitalize">{key}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedContent>

                {data?.descriptions &&
                    <AnimatedContent
                        distance={300}
                        direction="vertical"
                        reverse={false}
                        config={{ tension: 80, friction: 20 }}
                        initialOpacity={0.2}
                        animateOpacity
                        scale={1.1}
                        threshold={0.2}
                    >
                        <p className="mt-4 text-gray-600">{data.descriptions}</p>
                    </AnimatedContent>}

                <AnimatedContent
                    distance={300}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 80, friction: 20 }}
                    initialOpacity={0.2}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                >
                    <div className="flex items-center justify-center">
                        <BenzoButton className="mt-4 !w-36">
                            Back to home
                        </BenzoButton>
                    </div>
                </AnimatedContent>

            </div>
        </motion.div>
    )
}

export default BenzoTimeTogether
