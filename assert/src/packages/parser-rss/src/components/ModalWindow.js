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