import React from 'react';
import './style.scss'
export class SettingsItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <tr>
                {this.props.children}
            </tr>
        )
    }
}