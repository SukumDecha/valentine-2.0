import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode;
  animationEndPos: number;
}

const FloatingAnimation = ({ children, animationEndPos }: Props) => {
  return (
    <motion.div
      animate={{ x: [0, animationEndPos, 0] }} // Moves left and right
      transition={{
        duration: 4, // Duration of one cycle
        repeat: Infinity, // Loops forever
        ease: 'easeInOut' // Smooth easing
      }}
    >
      {children}
    </motion.div>
  )
}

export default FloatingAnimation