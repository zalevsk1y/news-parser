import React from 'react';

export function InfoBox({title,children}){
    return (
        
                <div id="postimagediv" className="postbox ">
                    <button type="button" className="handlediv" aria-expanded="true">
                        <span class="screen-reader-text">{'Toggle panel:'+title}</span>
                        <span class="toggle-indicator" aria-hidden="true"></span>
                    </button>
                    <h2 class="hndle ui-sortable-handle infobox-header">
                        <span>{title}</span>
                    </h2>
                    {children}
                </div>
    )
}
export function InfoBody({children}){
    return (
        <div class="inside">
            {children}
        </div>
    )
}
export function InfoFooter({children}){
    return (
        <div className="infobox-footer">
            {children}
        </div>
    )
}