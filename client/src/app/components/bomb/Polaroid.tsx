import UserImages from "./UserImages";


const PolaroidPhoto = ({ imageSrc }: { imageSrc: string[] }) => {
  return (
    <div className="flex flex-col items-center rounded-lg shadow-lg h-full max-w-5xl w-full mb-10">
      {/* Polaroid Camera Frame */}
      <div className="flex flex-col items-center w-full">
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
        {/* Polaroid Photo User Images */}
        <UserImages imageSrcs={imageSrc} />
      </div>
    </div>
  );
};

export default PolaroidPhoto;
