import React from 'react'
import MidNightCloud from './MidNightCloud'
import useResponsive from '@/hooks/useResponsive'


interface IImageProps {
    width?: number
    height?: number
    styles?: React.CSSProperties
}

const MidNightTabletlouds = () => {
    const { isMiniTablet } = useResponsive()

    const cloudStyleA: IImageProps = {
        width: isMiniTablet ? 400 : 500,
        height: 400,
        styles: {
            position: 'absolute',
            top: isMiniTablet ? 70 : 30,
            // left: `calc(100vw / 6)`,
            left: isMiniTablet ? 'calc(100vw / 6)' : 'calc(100vw / 7)',
        }
    }

    const cloudStyleB: IImageProps = {
        width: isMiniTablet ? 400 : 500,
        height: 400,
        styles: {
            position: 'absolute',
            top: 120,
            right: isMiniTablet ? 'calc(100vw / 6)' : 'calc(100vw / 8)',
            zIndex: 0,
            // border: '1px solid red'
        }

    }

    return (
        <>
            <MidNightCloud styles={cloudStyleA} largeCloud />
            <MidNightCloud styles={cloudStyleB} largeCloud />
        </>
    )
}

export default MidNightTabletlouds