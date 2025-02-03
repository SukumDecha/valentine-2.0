import React from 'react';
import confetti from 'canvas-confetti';

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
                <p
                    className="-title"
                    style={{ opacity: isClicked ? 1 : 0, display: isClicked ? 'block' : 'none' }}
                >
                    <br />
                    {title}
                </p>
                <p className="-instructions">(Click me!)</p>
            </div>
        </div>
    );
};

export default BenzoHeart;