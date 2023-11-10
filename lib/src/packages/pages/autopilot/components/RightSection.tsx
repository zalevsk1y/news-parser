import React from 'react'
import { PAGES } from '@news-parser/config/i18n';
// https://www.buymeacoffee.com/4832232T

export function RightSection() {
    return (
        <div className='pt-2 pb-2 ps-3 pe-3 mb-2'>
            <h2 className='np-fs-22 flex-column align-items-center'>
                {PAGES.AUTOPILOT.RIGHT_SECTION_TITLE}&nbsp; <span className="badge bg-primary">Beta</span>
            </h2>
            <p>
                {PAGES.AUTOPILOT.RIGHT_SECTION_BODY}
            </p>
            
        </div>

    )
}