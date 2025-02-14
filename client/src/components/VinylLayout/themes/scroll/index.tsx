"use client";

import React from "react";
import ScrollIn from "@/components/Shared/animations/ScrollIn"
import PixelTransition from "@/components/Shared/animations/PixelTransition"
import { IUserResponse, IVinyl } from "@/types/vinyl/vinyl";
import SpotifyEmbed from "@/components/Shared/SpotifyEmbed";
import SlideIn from "@/components/Shared/animations/SlideIn";

interface IProps {
    data: IUserResponse
};

const bg = "/images/nay/bg.png";

const ScrollVinyl = ({ data }: IProps) => {


    const images = data.images && data.images?.length > 0 ? data.images : [{
        id: `1`,
        text: "I love you",
        url: "/images/nay/gift.png",
    },
    {
        id: `2`,
        text: "You are so special",
        url: "/images.jpg",
    },
    {
        id: `3`,
        text: "Please be mine",
        url: "/images/nay/gift.png",
    },
    {
        id: `4`,
        text: "You are my everything",
        url: "/images.jpg",
    },
    {
        id: `5`,
        text: "I love you",
        url: "/images/nay/gift.png",
    }
    ];

    return (
        <div className="bg-pink-100 h-screen flex items-center justify-center">
            <div className="absolute inset-0 h-full bg-cover bg-center opacity-90" style={{ backgroundImage: `url(${bg})` }} >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-100 h-[100vh] overflow-y-scroll">
                    <div className="relative z-10 max-w-lg mx-auto p-8">
                        <ScrollIn>
                            <div className="bg-white p-6 rounded-2xl shadow-xl text-center opacity-95 mb-6 border-4 border-pink-300">
                                <h1 className="text-3xl font-bold text-pink-600 animate-bounce">{data.description?.title} Dear, Reader ❤️</h1>
                                <p className="text-gray-700 mt-2 font-serif">
                                    {data.description?.description || "You are the most precious gift in my life. I love you deeply. 💕"}
                                </p>
                            </div>
                        </ScrollIn>
                        <SlideIn
                            yOffset={'300%'}
                            duration={1}
                            className="sm:block w-full mx-auto relative rounded-2xl"
                        >
                            <SpotifyEmbed trackId={data.trackId as string} />
                        </SlideIn>
                        {images?.map((preview, index) => (
                            <ScrollIn key={index} delay={index * 0.2}>
                                <div className="bg-white p-3 w-full max-w-md rounded-2xl shadow-xl mb-6 flex justify-center border-4 border-pink-300">
                                    <PixelTransition
                                        firstContent={
                                            <img
                                                src={preview?.url}
                                                alt={`Image preview ${index + 1}`}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        }
                                        secondContent={
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "grid",
                                                    placeItems: "center",
                                                    backgroundColor: "rgb(249 168 212)",
                                                }}
                                            >
                                                <p className="libre-baskerville-regular-italic text-center text-sm font-bold" style={{ color: "#ffffff" }}>{preview?.text || 'I love you'}</p>
                                            </div>
                                        }
                                        gridSize={12}
                                        pixelColor='#feeaf5'
                                        animationStepDuration={0.4}
                                        className="custom-pixel-card"
                                    />
                                </div>
                            </ScrollIn>
                        ))}
                        <div className="absolute top-10 right-10 animate-pulse text-red-400 text-3xl">💘</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollVinyl;

