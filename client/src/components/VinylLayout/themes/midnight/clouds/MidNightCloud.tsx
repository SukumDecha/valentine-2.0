import Image from 'next/image'
import React, { CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface IProps {
    className?: string
    styles: {
        width?: number
        height?: number
        styles?: CSSProperties
    }
    largeCloud?: boolean
}

const MidNightCloud = ({ className, styles, largeCloud = false }: IProps) => {
    const src = largeCloud ? '/images/vinyl/midnight/cloud-large.png' : '/images/vinyl/midnight/cloud.png'

    return (
        <motion.img
            src={src}
            alt="cloud"
            width={styles.width}
            height={styles.height}
            className={className}
            style={{
                zIndex: 20,
                ...styles.styles,
            }}
            draggable={false}
            animate={{ x: [0, 10, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,

            }}
        />
    )
}

export default MidNightCloud