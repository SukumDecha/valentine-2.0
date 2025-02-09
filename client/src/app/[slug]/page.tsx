import UserImage from '../components/show-image/UserImage';
import SearchSong from '../components/song/SearchSong'
import UploadImage from '../components/upload-image/ImageUpload';

const images: string[] = [
  '/b1.jpg',
  '/b2.jpg',
  '/b3.jpg',
  '/b4.jpg',
  '/b5.jpg',
];

interface PageProps {
  params: {
      slug: string
  }
}

const CameraPage = ({ params }: PageProps) => {
  const url_slug = params.slug;
  return (
    <section className='bg-gradient-to-r from-red-500 to-pink-600'>
      <div className='flex flex-col items-center p-4 gap-10 h-auto text-white max-w-3xl mx-auto'>
        <div className='space-y-2 w-full'>
          <h1 className='text-lg font-bold text-center'>Happy Valentine's Day</h1>
          <p className='font-medium text-sm/4'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi voluptatum quo, praesentium ducimus doloribus voluptates aliquid. Expedita, quia? Eveniet dolorum sed error blanditiis commodi quia nesciunt eligendi praesentium soluta tempora.
          </p>
        </div>
        <SearchSong />
        <UploadImage url_slug={url_slug} />
        <UserImage slug={url_slug} />
      </div>
    </section>
  );
};

export default CameraPage;