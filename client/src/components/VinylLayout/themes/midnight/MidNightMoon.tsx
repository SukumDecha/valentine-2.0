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
}

const MidNightMoon = ({ className, styles }: IProps) => {
    return (
        <motion.div
            initial={{ scale: 1, boxShadow: '0px 0px 10px rgba(0, 0, 255, 0.5)' }}
            animate={{
                scale: 1.2,
                boxShadow: '0px 0px 25px rgba(0, 0, 255, 0.8)'
            }}
            className={className}
            style={{
                display: 'inline-block',
                borderRadius: '50%',
                ...styles.styles,
            }}
        >
            <Image
                src="/images/vinyl/midnight/blue-moon.png"
                alt="cloud"
                width={styles.width}
                height={styles.height}
                style={{
                    zIndex: 20,
                    borderRadius: '50%'
                }}
                draggable={false}
            />
        </motion.div>
    )
}

export default MidNightMoon
