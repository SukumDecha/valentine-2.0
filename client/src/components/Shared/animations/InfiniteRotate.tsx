import React from 'react'
import {motion} from 'framer-motion'

type Props = {
  children: React.ReactNode
}

const InfiniteRotate = ({children}: Props) => {
  
  return (
    <motion.div
      animate={{ rotate: 360*2 }}
      transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
    >
      {children}
    </motion.div>
  )
}

export default InfiniteRotate