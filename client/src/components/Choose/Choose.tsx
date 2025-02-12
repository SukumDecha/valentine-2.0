"use client"
import React from 'react'
import SearchSong from './SearchSong'
// import UploadImage from './ImageUpload'
import { Heart } from 'lucide-react'
<<<<<<< HEAD
import User from './User'

=======
>>>>>>> cbf76a1d71ee9243a1272582bee62de0b1193372
const Choose = ({uuid} : {uuid:string}) => {
    return (
        <section className='min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-500'>
            <div className="container mx-auto px-4 py-8 md:py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Heart className="w-8 h-8 text-white animate-pulse" fill="white" />
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Create Your Valentine's Memory
                        </h1>
                        <Heart className="w-8 h-8 text-white animate-pulse" fill="white" />
                    </div>
                    <p className="text-white/80 text-lg">Choose a special song and share your moments</p>
                </div>

                {/* Content Container */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Song Selection Section */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-5 h-5 text-white" fill="white" />
                            <h2 className="text-xl font-semibold text-white">Choose Your Song</h2>
                        </div>
                        <SearchSong uuid_slug={uuid} />
                    </div>

                    {/* Image Upload Section */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-5 h-5 text-white" fill="white" />
                            <h2 className="text-xl font-semibold text-white">Share Your Moments</h2>
                        </div>
                        <User uuid_slug={uuid} />
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                    {[...Array(20)].map((_, i) => (
                        <Heart
                            key={i}
                            className="absolute text-white/20 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                width: `${20 + Math.random() * 20}px`,
                                height: `${20 + Math.random() * 20}px`
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Choose

// Add this to your global CSS file
const styles = `
@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(10deg);
    }
}

.animate-float {
    animation: float 5s ease-in-out infinite;
}
`;