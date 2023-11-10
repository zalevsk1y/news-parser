import React from "react";
import { PAGES } from '@news-parser/config/i18n';

export type ChangeCronStatusButtonType =  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading: boolean,
    buttonName: string,
} 

export const ButtonWithLoading: React.FC<ChangeCronStatusButtonType> = ({ isLoading,buttonName, onClick, ...otherProps }) => {
    return (
        <button {...otherProps} onClick={onClick}>
            {
                isLoading ?
                    <>
                        <span className='spinner-border spinner-border-16 np-fs-16 ' role='status' aria-hidden='true' />
                        <span className='sr-only np-fs-16'>&nbsp;{PAGES.AUTOPILOT.SELECT_BUTTON_LOADING}</span>
                    </> :
                     <span className='px-4 np-fs-16'>{buttonName}</span>
            }
        </button>
    )
}