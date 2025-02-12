import useResponsive from '@/hooks/useResponsive'
import React from 'react'
import MidNightCloud from './MidNightCloud'
import SlideIn from '@/components/Shared/animations/ScrollIn'


interface IImageProps {
    width?: number
    height?: number
    styles?: React.CSSProperties
}

const MidNightMobileClouds = () => {

    const cloudStyleA: IImageProps = {
        width: 200,
        height: 200,
        styles: {
            position: 'absolute',
            top: -50,
            right: -70
        }
    }

    const cloudStyleB: IImageProps = {
        width: 200,
        height: 200,
        styles: {
            position: 'absolute',
            top: 400,
            left: -70,
            zIndex: 0
        }

    }

    const cloudStyleC: IImageProps = {
        width: 200,
        height: 200,
        styles: {
            position: 'absolute',
            top: 550,
            right: -70
        }
    }
    return (
        <>
            <MidNightCloud styles={cloudStyleA} />
            <MidNightCloud styles={cloudStyleB} />
            <MidNightCloud styles={cloudStyleC} />
        </>
    )
}

export default MidNightMobileClouds