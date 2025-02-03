import { IComponentProps } from '@/types/component';
import React from 'react';

interface IProps extends IComponentProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary';
}

const BenzoButton = ({ children, type = 'button', onClick, className, variant = 'primary' }: IProps) => {
    return (
        <button
            className={`benzo-button -pushable ${className}`}
            type={type}
            onClick={onClick}
        >
            <span className={`benzo-button -shadow -${variant}`}></span>
            <span className={`benzo-button -edge -${variant}`}></span>
            <span className={`benzo-button -front text -${variant}`}>
                {children}
            </span>
        </button >
    );
};

export default BenzoButton;