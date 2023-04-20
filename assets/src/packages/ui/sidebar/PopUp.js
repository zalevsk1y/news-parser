import React from 'react';
//import '@news-parser/styles/sidebar/_popup.scss';

export function PopUp ({children,open}){
    return (
        <div className={`pop-up${open?' pop-up-open':' pop-up-close'}`}>{children}</div>
    )
}