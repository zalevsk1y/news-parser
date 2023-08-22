import React from 'react'
// https://www.buymeacoffee.com/4832232T

export function RightSection() {
    return (
        <div className='pt-2 pb-2 ps-3 pe-3 mb-2 bg-white autopilot-tabs-container'>
            <div className='mb-3 text-center np-fs-16'>
                Did you enjoy using this plugin? <br />Please leave a review!
                <div className='text-center'><a href='#'> ⭐⭐⭐⭐⭐</a> </div>
            </div>
            <div className='mb-3 text-center np-fs-16'>
                <div className='mb-2'>Show your support!</div>
                <button className='btn btn-primary w-100' type='button'><span className='np-fs-14'>Buy author a coffee ☕</span></button>
            </div>
        </div>
    )
}