import React from 'react';
import './style.scss'
export class SettingsItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='d-flex flex-row settings-item'>
                {this.props.children}
            </div>
        )
    }
}