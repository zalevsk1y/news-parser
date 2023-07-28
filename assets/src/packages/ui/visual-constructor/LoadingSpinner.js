import React from 'react';
import config from '@news-parser/config/';

export const LoadingSpinner=({style})=>{
    return (
        <div className="loading-spinner" style={style}>
            <img src={config.spinnerImage} alt="loading"></img>
        </div>
    )
}