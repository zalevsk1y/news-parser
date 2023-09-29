import React from "react";

export type SettingsBlock={
    children:Array<React.ReactElement>,
    className:string
}
export const SettingsBlock:React.FC<SettingsBlock>=({className,children})=>{
    return (
        <div className={className}>
            {children[0]}
            {children[1]}
            {children[2]&&<div className='text-block mt-2'>
                {children[2]}
            </div>}
    </div>
    )
}