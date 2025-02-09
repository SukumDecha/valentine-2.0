import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

interface IProps {
    className?: string
    styles?: React.CSSProperties
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
                ...styles
            }}
        >
            <Image
                src="/images/vinyl/midnight/blue-moon.png"
                alt="cloud"
                width={100}
                height={100}
                style={{
                    zIndex: 20,
                    borderRadius: '50%'
                }}
            />
        </motion.div>
    )
}

export default MidNightMoon
