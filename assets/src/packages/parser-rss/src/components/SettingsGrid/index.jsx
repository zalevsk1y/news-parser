import React from 'react';
import './style.scss'

export class SettingsGrid extends React.Component{
    constructor (props){
        super (props);
    }
    render(){
        return(
            <div className="d-flex flex-column">
                    {this.props.children}
            </div>
        )
    }
}