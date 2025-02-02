import Image from "next/image";

const PolaroidPhoto = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="relative flex flex-col items-center w-60 bg-white p-4 rounded-lg shadow-lg border">
      {/* Polaroid Camera Frame */}
      <div className="relative flex flex-col items-center w-full">
        {/* Camera Top */}
        <div className="w-full bg-gray-900 p-4 rounded-t-lg">
          <div className="relative">
            {/* Lens */}
            <div className="w-10 h-10 bg-gray-700 rounded-full border-4 border-black mx-auto"></div>
            {/* Flash and Buttons */}
            <div className="absolute top-1 left-1 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded"></div>
            {/* Color Stripes */}
            <div className="flex justify-center mt-2">
              <div className="w-2 h-6 bg-red-500 mx-0.5"></div>
              <div className="w-2 h-6 bg-yellow-500 mx-0.5"></div>
              <div className="w-2 h-6 bg-green-500 mx-0.5"></div>
              <div className="w-2 h-6 bg-blue-500 mx-0.5"></div>
            </div>
          </div>
        </div>

        {/* Polaroid Photo */}
        <div className="w-full bg-gray-200 p-2">
          <div className="relative w-full h-40 bg-white shadow-md border">
            <Image
              src={imageSrc}
              alt="Polaroid Picture"
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        </div>

        {/* Label */}
        <p className="mt-2 text-sm font-semibold text-gray-700">POLAROID PHOTO</p>
      </div>
    </div>
  );
};

export default PolaroidPhoto;
