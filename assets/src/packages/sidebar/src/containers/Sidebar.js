import React from 'react';
import {createPortal} from 'react-dom';
import { SidebarItemLabel } from '../components/SidebarItemLabel';
import { SidebarItem } from '../components/SidebarItem';
import '@news-parser/styles/sidebar/_sidebar.scss';

export class Sidebar extends React.Component{
    constructor (props){
        super(props);
        this.sidebarContainer=document.getElementById('parser-sidebar-left')
    }
    sidebarTemplate(header,children){
        return (
            <>
                <SidebarItem wide={true} border={true}>
                <SidebarItemLabel>header</SidebarItemLabel>
                    <span className='sidebar-header-close-cross'>x</span>
                </SidebarItem>
                {children}
            </>
        )
    }
    render(){
        return createPortal(this.sidebarTemplate(this.props.sidebarHeader,this.props.children),this.sidebarContainer);
    }
}