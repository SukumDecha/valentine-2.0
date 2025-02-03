'use client'
import React, { useState } from 'react'
import BenzoHeart from './BenzoHeart';
import FadeIn from '@/components/Shared/animations/FadeIn';
import BenzoNavgiate from './BenzoNavgiate';

const navigations = [{
    title: 'Memories',
    imageUrl: '/images/benzo/icons/bow.png',
    url: '/memories'
},
{
    title: 'Messages',
    imageUrl: '/images/benzo/icons/cake.png',
    url: '/messages'
},
{
    title: 'Quiz',
    imageUrl: '/images/benzo/icons/chocolate.png',
    url: '/quiz'
},
{
    title: 'Time',
    imageUrl: '/images/benzo/icons/clock.png',
    url: '/time-together'
}]

const BenzoLanding = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [showCta, setShowCta] = useState(false);

    const doClick = () => {
        setIsClicked(!isClicked);

        setTimeout(() => {
            setShowCta(true);
        }, (1500));
    }

    return (
        <div className='benzo-landing'>
            <div
                className={`transition-transform duration-500 ease-out ${showCta ? "-translate-y-10" : "translate-y-0"
                    }`}
            >
                <BenzoHeart title="💜 Happy Valentine 💜" isClicked={isClicked} handleClick={doClick} />
            </div>

            <div className="-navigators">
                {showCta && (
                    <>
                        {navigations.map((nav, index) => (
                            <FadeIn key={index} delay={index * 0.5}>
                                <BenzoNavgiate
                                    imageUrl={nav.imageUrl}
                                    title={nav.title}
                                    url={nav.url}
                                />
                            </FadeIn>
                        ))}
                    </>)
                }
            </div>
        </div>
    )
}

export default BenzoLanding