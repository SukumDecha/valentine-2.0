import React from 'react';
import { motion } from 'framer-motion';
import { IComponentProps } from '@/types/component';

interface IProps extends IComponentProps {
    duration?: number;
    xOffset?: string;
    className?: string;
}

const SlideIn = ({ children, xOffset = '-100%', duration = 0.5, className }: IProps) => {
    return (
        <motion.div
            className={className}
            initial={{ x: xOffset }}
            animate={{ x: 1 }}
            transition={{ duration, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default SlideIn;