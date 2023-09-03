import React from 'react';
import '../stules/Button.css';

export interface ButtonProps {
    children: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
        <button type='button' className='button button-primary button-large' onClick={onClick}>{children}</button>
    )


