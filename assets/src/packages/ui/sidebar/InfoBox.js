import React from 'react';

/**
 * Info box element.
 * 
 * @param {object} props  
 */
export function InfoBox({title,children}){
    return (
                <div id="postimagediv" className="postbox">
                    <div className='d-flex flex-row'>
                        <h2 className="ui-sortable-handle infobox-header flex-grow-1">
                            <span>{title}</span>
                        </h2>
                        <button type="button" className="handlediv" aria-expanded="true">
                            <span className="screen-reader-text">{'Toggle panel:'+title}</span>
                            <span className="toggle-indicator" aria-hidden="true"></span>
                        </button>
                    </div>
                    {children}
                </div>
    )
}

/**
 * Body of infobox element.
 * 
 * @param {object} props  
 */
export function InfoBody({children}){
    return (
        <div className="inside">
            {children}
        </div>
    )
}
/**
 * Footer of infobox element.
 * 
 * @param {children} props 
 */
export function InfoFooter({children}){
    return (
        <div className="infobox-footer">
            {children}
        </div>
    )
}