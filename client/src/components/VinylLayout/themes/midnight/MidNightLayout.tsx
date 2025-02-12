import { ReactNode } from "react"
import MidNightCloud from "./clouds/MidNightCloud"
import useResponsive from "@/hooks/useResponsive"
import { CSSProperties } from "react"
import MidNightMoon from "./MidNightMoon"
import Background from "@/components/Shared/Background"
import MidNightMobileClouds from "./clouds/MidNightMobileClouds"
import MidNightTabletlouds from "./clouds/MidNightTabletClouds"

interface IProps {
    children: ReactNode
}

interface IImageProps {
    width?: number
    height?: number
    styles?: CSSProperties
}

const MidNightLayout = ({ children }: IProps) => {
    const { isMobile, isMiniTablet } = useResponsive()

    const moonStyle: IImageProps = {
        width: isMobile ? 150 : isMiniTablet ? 200 : 250,
        height: isMobile ? 150 : isMiniTablet ? 200 : 250,
        styles: {
            position: 'absolute',
            top: isMobile ? -40 : 40,
            left: isMobile ? -50 : 'calc(100vw / 2.3)'
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#09122C] overflow-hidden relative p-4 font-Libre italic">
            <MidNightMoon styles={moonStyle} />

            {isMobile ?
                <MidNightMobileClouds /> :
                <MidNightTabletlouds />
            }

            <Background imageUrl="/images/vinyl/midnight/star.png" />

            <div className="flex w-full h-[85vh] flex-col sm:flex-row items-center sm:justify-center gap-4 sm:gap-24 overflow-y-scroll overflow-x-hidden z-[100]">
                {children}
            </div>

            <div className="text-center text-white opacity-50 my-8 sm:text-2xl">Valentine 2.0</div>
        </div>

    )
}

export default MidNightLayout