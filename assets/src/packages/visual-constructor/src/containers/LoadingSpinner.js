import React from 'react';
import config from '@news-parser/config/';

export const LoadingSpinner=()=>{
    return (
        <div className="loading-spinner">
            <img src={config.spinnerImage}></img>
        </div>
    )
}