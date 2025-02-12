import React from "react";
import SlideIn from "@/components/Shared/animations/slideIn"

type Props = {
    name: string;
    message?: string;
    image?: {
        url: string;
        alt?: string;
    }[];
};

const bg = "/images/nay/bg.png";

const Page = ({ name, message, image }: Props) => {
    return (
        <div className="bg-pink-100 min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: `url(${bg})` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-100" />


            <div className="relative z-10 max-w-lg mx-auto p-8">
                <SlideIn>
                    <div className="bg-white p-6 rounded-2xl shadow-xl text-center opacity-95 mb-6 border-4 border-pink-300">
                        <h1 className="text-3xl font-bold text-pink-600 animate-bounce">Dear, {name} ❤️</h1>
                        <p className="text-gray-700 mt-2 font-serif">
                            {message || "You are the most precious gift in my life. I love you deeply. 💕"}

                        </p>
                    </div>
                </SlideIn>


                {image?.map((item, index) => (
                    <SlideIn key={index} delay={index * 0.2}>
                        <div className="bg-white p-3 w-full max-w-md rounded-2xl shadow-xl mb-6 flex justify-center border-4 border-pink-300">
                            <img
                                src={item.url}
                                alt={item.alt || "Valentine image"}
                                className="rounded-xl w-full h-64 object-cover"
                            />
                        </div>
                    </SlideIn>
                ))}

                <div className="absolute bottom-5 left-5 animate-pulse text-pink-500 text-4xl">
                    <img src="/images/nay/gift.png" alt="gift" width={80} height={80} />
                </div>
                <div className="absolute top-10 right-10 animate-pulse text-red-400 text-3xl">💘</div>

            </div>
        </div>
    );
};

export default Page;
