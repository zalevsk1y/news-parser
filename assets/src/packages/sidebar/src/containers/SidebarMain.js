import React from 'react';
import { Sidebar } from './Sidebar';
import { Select } from '../components/Select';
import { SidebarItemLabel } from '../components/SidebarItemLabel';
import { SidebarItem } from '../components/SidebarItem';
import { SidebarItemsGroup } from '../components/SidebarItemsGroup';

export class SidebarMain extends React.Component{
    constructor (props){
        super(props);
    }
    info(infoMessage){
        return {
            header:'Info',
            render:
            (
                <SidebarItem>
                    {infoMessage}
                </SidebarItem>
            )
        }
    }
    parsingMode(){
        return {
            header:'Parsing Mode',
            render :(
            <SidebarItem wide={true} border={true}>
                    <SidebarItemLabel>Select parsing mode:</SidebarItemLabel>
                    <Select onChange={(e)=>{}} >
                        <option defaultValue >Parse RSS</option>
                        <option>Parse Page</option>
                    </Select>
                </SidebarItem>
            )   
        }
    }
    parseRSSMenu(){
        return {
            header:'Parsing Mode',
            render :(
            <SidebarItemsGroup header='Status & visibility'>
                <SidebarItem>
                    <SidebarItemLabel>Visibility:</SidebarItemLabel>
                    <Select onChange={(e)=>{}} >
                        <option defaultValue >Public</option>
                        <option>Private</option>
                        <option>Password Protected</option>
                    </Select>
                </SidebarItem>
                <SidebarItem> 
                    <SidebarItemLabel>Publish:</SidebarItemLabel>
                </SidebarItem>
                <SidebarItem>
                    <SidebarItemLabel>Post format:</SidebarItemLabel>
                    <Select onChange={(e)=>{}} >
                        <option>Aside</option>
                        <option>Audio</option>
                        <option>Chat</option>
                        <option>Gallery</option>
                        <option>Imagey</option>
                        <option>Link</option>
                        <option>Quote</option>
                        <option defaultValue >Standart</option>
                        <option>Status</option>
                        <option>Video</option>
                    </Select>
                </SidebarItem>
            </SidebarItemsGroup>
            )   
        }
    }
    render(){
        const menu=this.parseRSSMenu();
        return(
            <Sidebar sidebarHeader={menu.header}>
                {menu.render}
            </Sidebar>
        )
    }
}