import React, { useMemo } from 'react'

export const SelectedPostsInfo=({postsCount,submitAction})=>{
    const message=useMemo(()=>(<>You selected <strong>{postsCount}</strong> posts.</>),[postsCount]),
        noTemplateMessage='You have no saved parsing template.',
        buttonDisabled=useMemo(()=>submitAction?false:true,[submitAction]);
        return (
            <div className="col-lg-10 alert alert-secondary d-flex" role="alertdialog">
                <span className='flex-grow-1 lh-2'>{submitAction?message:noTemplateMessage}</span>
                <button className="btn btn-secondary" disabled={buttonDisabled} onClick={buttonDisabled?undefined:submitAction}>Parse</button>
            </div>
    )
}