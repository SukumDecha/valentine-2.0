import Image from 'next/image'
import React, { CSSProperties } from 'react'

interface IProps {
    className?: string
    styles: {
        width?: number
        height?: number
        styles?: CSSProperties
    }
}
const MidNightCloud = ({ className, styles }: IProps) => {
    return (
        <Image
            src="/images/vinyl/midnight/cloud.png"
            alt="cloud"
            width={styles.width}
            height={styles.height}
            className={className}
            style={{
                zIndex: 20,
                ...styles.styles,
            }}
            draggable={false}
        />
    )
}

export default MidNightCloud