import React from 'react';
import './style.scss';

export class SettingsBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="inner-settings-container">
                {this.props.children}
            </div>
        )
    }
}