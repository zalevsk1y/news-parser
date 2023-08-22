import React from 'react';

export interface ActionAlertProps{
    hidden:boolean,
    children:React.ReactNode
}

export const ActionAlert:React.FC<ActionAlertProps>=({hidden,children})=>(
        <div hidden={hidden}> 
            <div className='col-lg-10 alert alert-secondary d-flex mx-auto' role='alertdialog'>
                {children}
            </div>
        </div>
    )