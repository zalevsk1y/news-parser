import React from 'react';

export class SettingValue extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <td>
                {this.props.children}
            </td>
        )
    }
}