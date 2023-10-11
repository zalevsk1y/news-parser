import React from 'react';
import PropTypes from 'prop-types';
/**
 * Button element.
 * 
 * @since 1.0.0
 * @param {object} props  
 */
export function Button({children,onClick}){
    return (
        <button type="button" className="button button-primary button-large"  onclick={onClick}>{children}</button>
    )
}

Button.propTypes={
    /**
     * Inner text of the button element.
     */
    children:PropTypes.array,
    /**
     * Button click handler.
     * 
     * @param {object} event Click event object.
     */
    onClick:PropTypes.func.isRequired
}

