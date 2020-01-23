import React from 'react';
import {document} from 'globals';
import VisualConstructor from '../containers/VisualConstructor';
import PropTypes from 'prop-types';

/**
 * Modal window controller.
 * 
 * @since 1.0.0
 */
export class ModalWindow extends React.Component{
    constructor(props){
        super(props);
        this.scroll=this.scroll.bind(this);
    }
    /**
     * Prevent scrolling when modal window is open.
     * 
     * @param {bool} state 
     */
    scroll(state){
        switch(state){
            case (true):
                document.documentElement.style.overflowY='auto';
                document.body.style.overflowY='auto';
                break;
            case(false):
                document.documentElement.style.overflowY='hidden';
                document.body.style.overflowY='scroll';
                break;
        }
    }
    render(){
        switch(this.props.type){
            case 'visualConstructor':
                return   <VisualConstructor onStateChange={this.scroll} />;
            default: 
                return <></>; 
        }
    }

}

ModalWindow.propTypes={
    /**
     * Modal window type [visualConstructor]. 
     */
    type:PropTypes.string.isRequired
}