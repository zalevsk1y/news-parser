import React from 'react'

export const ActionAlert=({hidden,children})=>{
    return (
        <div hidden={hidden}> 
            <div className="col-lg-10 alert alert-secondary d-flex mx-auto" role="alertdialog">
                {children}
            </div>
        </div>
    )
}