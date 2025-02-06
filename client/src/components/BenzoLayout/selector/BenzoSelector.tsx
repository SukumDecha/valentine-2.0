'use client'

import React, { useEffect, useState } from 'react'
import FadeIn from '@/components/Shared/animations/FadeIn';
import BenzoNavgiate from './BenzoNavgiate';
import { IBenzoSelector } from '@/types/benzo/time-spent';
import BenzoService from '@/services/benzo.service';
import Image from 'next/image';

const navigations = [{
    title: 'Memories',
    imageUrl: '/images/benzo/icons/ribbon.png',
    url: '/memories'
},
{
    title: 'Messages',
    imageUrl: '/images/benzo/icons/message.png',
    url: '/messages'
},
{
    title: 'Quiz',
    imageUrl: '/images/benzo/icons/chocolate.png',
    url: '/nine/quiz'
},
{
    title: 'Time',
    imageUrl: '/images/benzo/icons/clock.png',
    url: '/nine/time-together'
}]

const BenzoSelector = () => {
    const [data, setData] = useState<IBenzoSelector | undefined>(undefined)

    const doGetData = async () => {
        const data = await BenzoService.getSelectorData("uuid")
        setData(data)
    }

    useEffect(() => {
        doGetData()
    }, [])


    return (
        <div className='benzo-selector bg-benzo-landing bg-cover bg-center w-full min-h-screen'>
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

            <div className="-navigators">
                {navigations.map((nav, index) => (
                    <FadeIn key={index} delay={index * 0.5}>
                        <BenzoNavgiate
                            imageUrl={nav.imageUrl}
                            title={nav.title}
                            url={nav.url}
                        />
                    </FadeIn>
                ))}
            </div>
        </div>
    )
}

export default BenzoSelector