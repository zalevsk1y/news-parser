import React, { useCallback } from 'react';

export type IconsProps ={
    className: string,
    type:'button'|'checkbox'
    ariaLabel:string,
    id:string,
    onClick: ()=>void
}
/**
 * Creates icon and set click handler callback.
 * 
 * @since 0.8.0
 * @param {string} id id for input element
 * @param {string} className Icon class name.
 * @param {string} ariaLabel WIA_ARIA aria-label for input element.
 * @param {function} onClick Function click handler.  
 */
export const Icons: React.FC<IconsProps> = ({ type,className, onClick, ariaLabel,id }) => {
    const keyBoardEventHandler=useCallback((event:React.KeyboardEvent<HTMLLabelElement>)=>{
        console.log(event)
        if(event.key==='Enter'||event.key===' '){
            onClick();
        }
    },[])
    return(
        <>
            <label htmlFor={id} className={className} tabIndex={0} onKeyDown={keyBoardEventHandler}/>
            <input type={type} className='hidden' onClick={onClick} aria-label={ariaLabel} id={id}/>
        </>
    ) 
}
