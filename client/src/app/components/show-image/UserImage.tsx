"use client"
import { useState, useEffect } from 'react'
import { getUserImages } from '@/services/image.service';

interface ImageState {
    loading: boolean;
    error: string | null;
    images: string[];
}

const UserImage = ({ slug }: { slug: string }) => {
    const [state, setState] = useState<ImageState>({
        loading: true,
        error: null,
        images: []
    });

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setState(prev => ({ ...prev, loading: true, error: null }));
                const response = await getUserImages(slug);
                
                if (response.success && response.images) {
                    setState({
                        loading: false,
                        error: null,
                        images: response.images
                    });
                } else {
                    setState({
                        loading: false,
                        error: response.message || 'Failed to load images',
                        images: []
                    });
                }
            } catch (error) {
                setState({
                    loading: false,
                    error: error instanceof Error ? error.message : 'Failed to load images',
                    images: []
                });
            }
        };

        fetchImages();
    }, [slug]);

    if (state.loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"/>
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="text-center p-4 text-red-500">
                <p>Error: {state.error}</p>
            </div>
        );
    }

    if (state.images.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500">
                No images found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {state.images.map((imageUrl, index) => (
                <div 
                    key={index} 
                    className="relative aspect-square group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <img 
                        src={imageUrl}
                        alt={`User upload ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default UserImage;