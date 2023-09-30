import React from "react";

export type ChangeCronStatusButtonType =  {
    isLoading: boolean,
    buttonName: string,
    className:string,
    form:string,
    children?:React.ReactNode
} 

export const ButtonWithLoading: React.FC<ChangeCronStatusButtonType> = ({ isLoading,buttonName, children, ...otherProps }) => {
    return (
        <button {...otherProps} >
            {
                isLoading ?
                    <>
                        <span className='spinner-border spinner-border-16 np-fs-16 ' role='status' aria-hidden='true' />
                        <span className='sr-only np-fs-16'>&nbsp;Loading...</span>
                    </> :
                     <span className='px-4 np-fs-16'>{buttonName}</span>
            }
            {children}
        </button>
    )
}