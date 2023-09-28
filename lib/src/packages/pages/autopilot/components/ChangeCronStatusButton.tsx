import React from "react";

export type ChangeCronStatusButtonType = {
    isLoading: boolean,
    buttonName: string
}

export const ChangeCronStatusButton: React.FC<ChangeCronStatusButtonType> = ({ isLoading, buttonName }) => {
    return (
        <button form='cron-optios' type='submit' className='btn btn-primary np-btn' >
            {
                isLoading ?
                    <>
                        <span className='spinner-border spinner-border-16 np-fs-16 ' role='status' aria-hidden='true' />
                        <span className='sr-only np-fs-16'>&nbsp;Loading...</span>
                    </> :
                    <span className='px-4 np-fs-16'>{buttonName}</span>
            }
        </button>
    )
}