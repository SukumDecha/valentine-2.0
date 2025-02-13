import Image from 'next/image';

interface IProps {
    className?: string;
    width: number
    height: number
    images?: string[];
    // parentStyle: CSSProperties
}

const OliviaProps = ({ className, width = 100, height = 100, images }: IProps) => {
    return (
        <div className={`flex items-center justify-center gap-4 w-full relative ${className}`}
            style={{
                position: 'relative',
                height: `${height}px`,
            }}>
            {images?.map((imageUrl, index) => (
                <div style={{
                    position: 'relative',
                    width: `${width}px`,
                    height: `${height}px`,

                }}>
                    <Image
                        key={index}
                        src={imageUrl}
                        alt="props"
                        width={width}
                        height={height}
                        draggable={false}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            ))}
        </div>

    );
};

export default OliviaProps;
