import React from 'react';
import '../styles/PopUp';

export interface PopUpProps{
        isOpen:boolean,
        children:React.ReactNode,
}

export const PopUp:React.FC<PopUpProps> = ({children,isOpen})=>(
        <div className={`pop-up${isOpen?' pop-up-open':' pop-up-close'}`}>{children}</div>
    )