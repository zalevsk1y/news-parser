import React from 'react';
import PropTypes from 'prop-types';
/**
 * Check box element
 * 
 * @since 1.0.0
 * @param {object} props 
 */
 export function Checkbox ({value,onClick}){
    return (
        <input type="checkbox" value={!(!value)} onClick={onClick} ></input>
    )
}

Checkbox.propTypes={
    /**
     * Check box init state.
     */
    value:PropTypes.bool.isRequired,
    /**
     * Button click handler.
     * 
     * @param {object} event Click event object.
     */
    onClick:PropTypes.func.isRequired
}

