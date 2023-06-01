import React from 'react';
import PropTypes from 'prop-types';
/**
 * Creates icon and set click handler callback.
 * 
 * @since 0.8.0
 * @param {string} className Icon class name.
 * @param {string} title Icon title.
 * @param {function} onClick Function click handler.  
 */
export function Icons ({className,title,onClick}){
    return (
        <span className={className} title={title} onClick={onClick}></span>
    )
} 

Icons.propTypes={
    /**
     * Icon class name.
     */
    className:PropTypes.string.isRequired,
    /**
     * Icon title.
     */
    title:PropTypes.string.isRequired,
    /**
     * Click handler.
     * 
     * @param {object} event Event object.
     */
    onClick:PropTypes.func.isRequired
}