import React from 'react'

export const SelectedPostsInfo=({postsCount,submitAction})=>{
    return (
    
            <div className="col-lg-10 alert alert-secondary d-flex" role="alertdialog">
                <span className='flex-grow-1 lh-2'>You selected <strong>{postsCount}</strong> posts.</span>
                <button className="btn btn-secondary" onClick={submitAction}>Parse</button>
            </div>
            
    )
}