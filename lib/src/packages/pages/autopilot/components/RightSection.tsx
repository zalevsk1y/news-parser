import React from 'react'
import { newsParserSettings } from 'globals';
// https://www.buymeacoffee.com/4832232T

export function RightSection() {
    return (
        <div className='pt-2 pb-2 ps-3 pe-3 mb-2'>
            <h2 className='np-fs-22 flex-column align-items-center'>
                Autopilot Parsing&nbsp; <span className="badge bg-primary">Beta</span>
            </h2>
            <p>
                The autopilot parsing feature is currently in beta mode. Please be aware that it may have some bugs or unexpected behavior. Use it carefully.
            </p>
            
        </div>

    )
}