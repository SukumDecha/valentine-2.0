import Image from 'next/image'
import React from 'react'

interface IProps {
    className?: string
    styles?: React.CSSProperties
}
const MidNightCloud = ({ className, styles }: IProps) => {
    return (
        <Image
            src="/images/vinyl/midnight/cloud.png"
            alt="cloud"
            width={200}
            height={200}
            className={className}
            style={{
                ...styles,
                zIndex: 20
            }}
        />
    )
}

export default MidNightCloud