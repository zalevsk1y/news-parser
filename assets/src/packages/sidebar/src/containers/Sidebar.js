import React from 'react';
import {createPortal} from 'react-dom';
import { SidebarItemLabel } from '../components/SidebarItemLabel';
import { SidebarItem } from '../components/SidebarItem';

import '@news-parser/styles/sidebar/_sidebar.scss';

export class Sidebar extends React.Component{
    constructor (props){
        super(props);
        this.sidebarContainer=document.getElementById('parser-sidebar-left');
        this.sidebarContainerWidth=this.sidebarContainer.style.width;
        this.changeSidebarState=this.changeSidebarState.bind(this);
        this.viewportWidth=props.viewportWidth;
        this.viewportHeight=props.proviewportHeight
        this.state=this.mediaQuery('min-width',414)?{isSidebarOpen:false}:{isSidebarOpen:true};
        this.sidebarContainerClassName=''
    }
    mediaQuery(query,value){
        switch (query){
            case 'min-height':
                return +value>=this.viewportHeight;
            case 'min-width':
                return +value>=this.viewportWidth;
            case 'max-width':
                return +value<=this.viewportWidth;
            case 'max-height':
                return +value<=his.viewportHeight;
        }
    }
    changeSidebarState(){
        this.setState({isSidebarOpen:!this.state.isSidebarOpen});
    }
    changeSidebarContainerStyle(){
        this.state.isSidebarOpen&&this.sidebarContainer.style.overflowY==='hidden'?this.sidebarContainer.style.overflowY='':!this.state.isSidebarOpen&&(this.sidebarContainer.style.overflowY='hidden');
        return this.sidebarContainer.style.overflowY
    }
    sidebarTemplate(header,children){
        return (
            <>
                <SidebarItem wide={true} border={'bottom'}>
                <SidebarItemLabel>{header}</SidebarItemLabel>
                    <button className='sidebar-header-close-cross' onClick={this.changeSidebarState}>x</button>
                </SidebarItem>
                {children}
            </>
        )
    }
    sidebarOpenButtonRender(){
        return <button className={'sidebar-open-icon'} onClick={this.changeSidebarState}>←</button>
        
    }
    render(){
        this.changeSidebarContainerStyle();
        return createPortal(this.state.isSidebarOpen?this.sidebarTemplate(this.props.sidebarHeader,this.props.children):this.sidebarOpenButtonRender(),this.sidebarContainer);
    }
}