import React from 'react';
import {createPortal} from 'react-dom';

export class Sidebar extends React.Component{
    constructor (props){
        super(props);
        this.sidebarContainer=document.getElementById('parser-sidebar-left')
    }
    render(){
        return createPortal(this.props.children,this.sidebarContainer);
    }
}