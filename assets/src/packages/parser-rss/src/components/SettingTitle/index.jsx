import React from "react";
import './style.scss'

export class SettingTitle extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='settings-title'>
                <span className="settings-label">{this.props.children}</span>
            </div>
        )
    }
}