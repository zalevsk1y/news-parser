import React from 'react';
import './style.scss'

export class SettingsGrid extends React.Component{
    constructor (props){
        super (props);
    }
    render(){
        return(
            <table>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        )
    }
}