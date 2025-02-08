import { IComponentProps } from '@/types/component';
import { Button } from 'antd';
import React from 'react';

interface IProps extends IComponentProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

const BenzoButton = ({ children, type = 'button', onClick, className, variant = 'primary', disabled = false }: IProps) => {
    return (
        <button
            className={`benzo-button -pushable ${className} ${disabled ? '-disabled' : ''}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
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