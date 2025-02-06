'use client'

import React, { useState } from 'react'
import BenzoHeart from './BenzoHeart';
import FadeIn from '@/components/Shared/animations/FadeIn';
import { useRouter } from 'next/navigation';

const BenzoLanding = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [allowToClick, setAllowToClick] = useState(false);

    const router = useRouter()

    const doClick = () => {
        setIsClicked(!isClicked);

        setTimeout(() => {
            setAllowToClick(true);
        }, 1500);
    }

    const doNavigate = () => {
        if (allowToClick) {
            router.push('/nine/selector')
        }
    }

    return (
        <div className="benzo-landing bg-benzo-landing bg-cover w-full flex flex-col items-center justify-center min-h-screen" onClick={doNavigate}>
            <BenzoHeart
                title="💜 Happy Valentine 💜"
                isClicked={isClicked}
                handleClick={doClick}
            />

            {isClicked && (
                <FadeIn>
                    <div className="text-center text-xl mt-6 font-cursive text-pink-600 animate-bounce">
                        💕 คลิกเพื่อไปดูความทรงจำของเรากันนนน 💕
                    </div>
                </FadeIn>
            )}
        </div>
    )
}

export default BenzoLanding
