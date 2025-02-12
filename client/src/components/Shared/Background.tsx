import React from "react";

interface IProps {
    imageUrl: string;
}

const Background = ({ imageUrl }: IProps) => {
    return (
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
        </div>
    );
};

export default Background;
