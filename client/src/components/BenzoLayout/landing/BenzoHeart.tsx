'use client'

import React from 'react';
import confetti from 'canvas-confetti';
import BlurText from '@/components/Shared/libraries/BlurText';

const createConfetti = () => {
    const emojiShape = confetti.shapeFromText({ text: '❤️', scalar: 3 });
    confetti({
        particleCount: 225,
        scalar: 3,
        angle: 90,
        spread: 360,
        startVelocity: 25,
        decay: 0.95,
        shapes: [emojiShape],
        origin: { x: 0.5, y: 0.4 },
        zIndex: -1,
    });
};

interface IProps {
    title: string;
    isClicked: boolean;
    handleClick: () => void;
}

const BenzoHeart = ({ title, isClicked, handleClick }: IProps) => {

    const doClick = () => {
        if (!isClicked) {
            createConfetti();
            handleClick();
        }
    };

    return (
        <div className="benzo-heart">
            <div
                className={`-heart ${isClicked ? 'clicked' : ''}`}
                onClick={doClick}
            >
                <div
                    className="-title"
                    style={{ opacity: isClicked ? 1 : 0, display: isClicked ? 'block' : 'none' }}
                >
                    <br />

                    <BlurText
                        text={title}
                        className='text-center justify-center'
                        delay={150}
                        animateBy="words"
                        direction="top"
                    />

                </div>
                <p className="-instructions">(Click me!)</p>
            </div>
        </div>
    );
};

export default BenzoHeart;