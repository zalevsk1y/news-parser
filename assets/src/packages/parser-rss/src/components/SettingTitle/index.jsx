import React from "react";

export class SettingTitle extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <td>
                <span className="settings-label">{this.props.children}</span>
            </td>
        )
    }
}