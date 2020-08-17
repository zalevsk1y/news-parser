import React from 'react';

export class SettingsSubmitButton extends React.Component{
    constructor (props){
        super(props)
    }
    render(){
        return(
            <div className="button-container"> 
                {this.props.children}
            </div>    
        )
    }
}