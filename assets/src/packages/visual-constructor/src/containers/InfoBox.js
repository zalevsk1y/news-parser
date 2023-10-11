import React from 'react';
import PropTypes from 'prop-types';
/**
 * Info box element.
 * 
 * @param {object} props  
 */
export function InfoBox({title,children}){
    return (
                <div id="postimagediv" className="postbox ">
                    <button type="button" className="handlediv" aria-expanded="true">
                        <span className="screen-reader-text">{'Toggle panel:'+title}</span>
                        <span className="toggle-indicator" aria-hidden="true"></span>
                    </button>
                    <h2 className="hndle ui-sortable-handle infobox-header">
                        <span>{title}</span>
                    </h2>
                    {children}
                </div>
    )
}
InfoBox.propTypes={
    /**
     * Title of infobox.
     */
    title:PropTypes.string.isRequired,
    /**
     * Content of infobox.
     */
    children:PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired
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