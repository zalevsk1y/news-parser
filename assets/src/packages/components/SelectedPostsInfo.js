import React, { useMemo } from 'react'

export const SelectedPostsInfo=({disabled,selectedPostsCount,submitAction})=>{
    const message=useMemo(()=>(<>You have selected <strong>{selectedPostsCount}</strong> posts.</>),[selectedPostsCount]);        
    return (
            <div className="col-lg-10 alert alert-secondary d-flex mx-auto" role="alertdialog">
                <span className='flex-grow-1 lh-2'>{submitAction?message:noTemplateMessage}</span>
                <button className="btn btn-secondary" disabled={disabled} onClick={submitAction}>Parse</button>
            </div>
    )
}