import React from 'react';
import { motion } from 'framer-motion';
import { IComponentProps } from '@/types/component';

interface IProps extends IComponentProps {
    delay?: number;
    duration?: number;
    yOffset?: number;
    direction?: 'top' | 'bottom' | 'left' | 'right';
}

const FadeIn = ({ children, delay = 0, duration = 1, direction = 'top' }: IProps) => {
    const yOffset = direction === 'top' ? -20 : direction === 'bottom' ? 20 : 0;
    const xOffset = direction === 'left' ? -20 : direction === 'right' ? 20 : 0;
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration }}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;