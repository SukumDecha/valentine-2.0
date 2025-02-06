"use client"
import Image from 'next/image';

export interface ImageProps {
    imageSrcs: string[];
}

const UserImages = ({ imageSrcs }: ImageProps) => {
    return (
        <div className="w-full flex flex-col gap-3 mt-3">
            {imageSrcs.map((src, index) => (
                <div className="relative w-full h-[380px] sm:h-[650px] lg:h-[900px]" key={index}>
                    <Image
                        src={src}
                        alt={`Polaroid Picture ${index + 1}`}
                        className="rounded-lg object-cover border-2 border-black"
                        fill
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    );
};

export default UserImages;