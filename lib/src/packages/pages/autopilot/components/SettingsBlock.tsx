import React from "react";

export type SettingsBlock={
    children:Array<React.ReactElement>
}
export const SettingsBlock:React.FC<SettingsBlock>=({children})=>{
    return (
        <div className='options-block d-flex flex-row mt-4'>
        <div className='col-4 col-lg-2'>
            {children[0]}
        </div>
        <div className='col-8 col-lg-6'>
            {children[1]}
            {children[2]&&<div className='text-block'>
                {children[2]}
            </div>}
        </div>
    </div>
    )
}