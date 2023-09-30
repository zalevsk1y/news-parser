import React, { useEffect, useRef } from "react";

export type VisualConstructorHeaderProps={
    title:string;
    closeHandler:()=>void
}

export const VisualConstructorHeader:React.FC<VisualConstructorHeaderProps>=({title,closeHandler})=>{
    const closeButton=useRef<HTMLButtonElement>(null);
    useEffect(()=>{
        if (closeButton.current!==null) closeButton.current.focus()
    },[])
    return (
        <div className='modal-header'>
                    <h2>{title}</h2>
                    <button
                        ref={closeButton}
                        type='button'
                        className='media-modal-close'
                        onClick={closeHandler}
                        aria-label='Close dialog'
                    >
                        <span className='media-modal-icon' />
                    </button>
                </div>
    )
}