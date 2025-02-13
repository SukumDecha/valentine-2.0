import { ReactNode } from "react"
import MidNightCloud from "./clouds/MidNightCloud"
import useResponsive from "@/hooks/useResponsive"
import { CSSProperties } from "react"
import MidNightMoon from "./MidNightMoon"
import Background from "@/components/Shared/Background"
import MidNightMobileClouds from "./clouds/MidNightMobileClouds"
import MidNightTabletlouds from "./clouds/MidNightTabletClouds"
import SlideIn from "@/components/Shared/animations/SlideIn"
import SpotifyEmbed from "@/components/Shared/SpotifyEmbed"
import { IUserResponse } from "@/types/vinyl/vinyl"

interface IProps {
    children: ReactNode
    data: IUserResponse
}

interface IImageProps {
    width?: number
    height?: number
    styles?: CSSProperties
}

const MidNightLayout = ({ children, data }: IProps) => {
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
        <div className="flex flex-col justify-center items-center h-screen bg-[#09122C] overflow-hidden relative font-Libre italic">
            <MidNightMoon styles={moonStyle} />

            {isMobile ?
                <MidNightMobileClouds /> :
                <MidNightTabletlouds />
            }

            <Background imageUrl="/images/vinyl/midnight/star.png" />

            <div className="w-full overflow-y-scroll overflow-x-hidden z-[100] relative pt-16">
                <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4 sm:gap-24">
                    {children}
                </div>
                <SlideIn
                    yOffset={'300%'}
                    duration={1}
                    className="sm:block w-[70vw] sm:w-[600px] mx-auto mt-16"
                >
                    <SpotifyEmbed trackId={data.trackId as string} />
                </SlideIn>
            </div>

            <div className="text-center text-white opacity-50 my-8 sm:text-2xl">Valentine 2.0</div>
        </div>

    )
}

export default MidNightLayout