import React from 'react';

export class SettingValue extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='flex-grow-1'>
                {this.props.children}
            </div>
        )
    }
}