import { ReactNode } from "react"
import MidNightCloud from "./MidNightCloud"
import useResponsive from "@/hooks/useResponsive"
import { CSSProperties } from "react"
import MidNightMoon from "./MidNightMoon"
import Background from "@/components/Shared/Background"

interface IProps {
    children: ReactNode
}

interface IImageProps {
    width?: number
    height?: number
    styles?: CSSProperties
}

const MidNightLayout = ({ children }: IProps) => {
    const { isMobile, isTablet } = useResponsive()

    const moonStyle: IImageProps = {
        width: isMobile ? 150 : isTablet ? 200 : 400,
        height: isMobile ? 150 : isTablet ? 200 : 400,
        styles: {
            position: 'absolute',
            top: isMobile ? -40 : isTablet ? 30 : 0,
            left: isMobile ? -50 : isTablet ? 50 : 0
        }
    }


    const cloudStyleA: IImageProps = {
        width: isMobile ? 200 : isTablet ? 400 : 400,
        height: isMobile ? 200 : isTablet ? 400 : 400,
        styles: {
            position: 'absolute',
            top: isMobile ? -50 : isTablet ? -30 : 0,
            right: isMobile ? -70 : isTablet ? -70 : 0
        }
    }

    const cloudStyleB: IImageProps = {
        width: isMobile ? 200 : isTablet ? 400 : 400,
        height: isMobile ? 200 : isTablet ? 400 : 400,
        styles: {
            position: 'absolute',
            top: isMobile ? 400 : isTablet ? 350 : 0,
            left: isMobile ? -70 : isTablet ? -100 : 0,
            zIndex: 0
        }

    }

    const cloudStyleC: IImageProps = {
        width: isMobile ? 200 : isTablet ? 400 : 400,
        height: isMobile ? 200 : isTablet ? 400 : 400,
        styles: {
            position: 'absolute',
            top: isMobile ? 550 : isTablet ? 800 : 0,
            right: isMobile ? -70 : isTablet ? -70 : 0
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#09122C] overflow-y-scroll relative">
            <MidNightMoon styles={moonStyle} />
            <MidNightCloud styles={cloudStyleA} />
            <MidNightCloud styles={cloudStyleB} />
            <MidNightCloud styles={cloudStyleC} />

            <Background imageUrl="/images/vinyl/midnight/star.png" />

            <div className="flex w-[80wh] h-[80vh] flex-col sm:flex-row items-center sm:justify-center gap-4 sm:gap-24 overflow-y-scroll overflow-x-hidden z-[100]">
                {children}
            </div>
        </div>

    )
}

export default MidNightLayout