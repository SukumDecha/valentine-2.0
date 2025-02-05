"use client"
import PolaroidPhoto from '../components/bomb/Polaroid'
import SpotifyEmbed from '../components/bomb/SpotifyEmbed'
import { getTrackId } from '@/services/song.service';
import { useState, useEffect } from 'react';

const images: string[] = [
  '/b1.jpg',
  '/b2.jpg',
  '/b3.jpg',
  '/b4.jpg',
  '/b5.jpg',
];

const CameraPage = () => {
  const [trackId, setTrackId] = useState<string>('');
  const [isLoadingTrack, setIsLoadingTrack] = useState<boolean>(true);

  const fetchTrackId = async () => {
    setIsLoadingTrack(true);
    try {
      const result = await getTrackId();
      if (result.success) {
        setTrackId(result.trackId ?? '');
      }
    } catch (error) {
      console.error('Error fetching track:', error);
    } finally {
      setIsLoadingTrack(false);
    }
  };

  useEffect(() => {
    fetchTrackId();
  }, []);

  return (
    <div className='bg-gradient-to-r from-red-500 to-pink-600 flex flex-col items-center p-4 text-sm/4 gap-10 h-auto text-white'>
      <div className='space-y-2 max-w-5xl w-full'>
        <h1 className='text-lg font-bold text-center'>Happy Valentine's Day</h1>
        <p className='font-medium'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi voluptatum quo, praesentium ducimus doloribus voluptates aliquid. Expedita, quia? Eveniet dolorum sed error blanditiis commodi quia nesciunt eligendi praesentium soluta tempora.
        </p>
      </div>

      {isLoadingTrack ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        </div>
      ) : (
        <SpotifyEmbed trackId={trackId} />
      )}

      <PolaroidPhoto imageSrc={images} />
    </div>
  );
};

export default CameraPage;
