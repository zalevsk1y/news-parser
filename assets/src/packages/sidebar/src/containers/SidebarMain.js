import React from 'react';
import { Sidebar } from './Sidebar';
import SidebarParsingModeMenu from './SidebarParsingModeMenu'
import SidebarPostProperties from './SidebarPostProperties';
import '@news-parser/styles/sidebar/_sidebar-main.scss';

export class SidebarMain extends React.Component{
    constructor (props){
        super(props);
        this.sidebarChangeHandler=this.sidebarChangeHandler.bind(this);
        this.state={sidebar:'Mode'}
    }
    renderHeader(){
        const navButtonClassName=`sidebar-header-nav-item`
        return (
            <div className='sidebar-header-nav-container'>
                <button className={navButtonClassName+(this.state.sidebar==='Mode'?' header-nav-button-active':'')} onClick={this.sidebarChangeHandler}>Mode</button>
                <button className={navButtonClassName+(this.state.sidebar==='Post'?' header-nav-button-active':'')} onClick={this.sidebarChangeHandler}>Post</button>
            </div>
        )
    }
    sidebarChangeHandler(event){
        const sidebarType=event.target.innerText;
        this.setState({sidebar:sidebarType})
    }
    sidebarRender(){
        switch (this.state.sidebar){
            case 'Mode':
                return <SidebarParsingModeMenu />;
            case 'Post':
                return <SidebarPostProperties />
        }
    }
    render(){
     
        return (
            <Sidebar sidebarHeader={this.renderHeader()} viewportHeigt={this.props.viewportHeigt} viewportWidth={this.props.viewportWidth}>
                {this.sidebarRender()}
            </Sidebar>
        )
    }
}