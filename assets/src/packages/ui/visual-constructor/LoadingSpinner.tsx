import React from 'react';
import config from '@news-parser/config/index';
import '../styles/LoadingSpinner.css';



export interface LoadingSpinnerProps {
    style: React.CSSProperties
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ style }) => (
        <div className='loading-spinner' style={style}>
            <img src={config.spinnerImage} alt='loading' />
        </div>
    )