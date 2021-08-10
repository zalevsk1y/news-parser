import React from 'react';
import { Sidebar } from './Sidebar';
import { Select } from '../components/Select';
import { SidebarItemLabel } from '../components/SidebarItemLabel';
import { SidebarItem } from '../components/SidebarItem';
import { SidebarItemsGroup } from '../components/SidebarItemsGroup';
import { PopUp } from '../components/PopUp';
import { PopUpTimeDate } from '../components/PopUpTimeDate';
import { SidebarItemExpandable } from '../components/SidebarItemExpandable';
import { TagInput } from '../components/TagInput';

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
        const categoryName='Uncategorised';
        return {
            header:'Parsing Mode',
            render :(
            <>
                <SidebarItemsGroup header='Status & visibility' border={'bottom'}>
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
                        <PopUpTimeDate></PopUpTimeDate>
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
                <SidebarItemsGroup header='Categories' border={'bottom'}>
                    <SidebarItem>
                        <input onChange={(e)=>{}} type='checkbox' id={`category-${categoryName}`}></input>
                        <label for={`category-${categoryName}`}>{categoryName}</label>
                    </SidebarItem>
                    <SidebarItemExpandable expandButtonCallback={(onClick)=><button onClick={onClick} className='pop-up-link'>Add New Category</button>}>
                        <div className='sidebar-item-expandable-row'>
                            <label for='category-input'>New Category Name</label>
                            <input type='text' id='category-input'></input>
                       </div>
                       <div className='sidebar-item-expandable-row'>
                            <label for='parent-category-select'>Parent Category</label><br></br>
                            <Select id='arent-category-select'>
                                <option>— Parent Category —</option>
                                <option>{categoryName}</option>
                            </Select>
                       </div>
                       <div className='sidebar-item-expandable-row'>
                            <button className='sidebar-submit-big-button'>Add New Category</button>
                        </div>
                    </SidebarItemExpandable>
                </SidebarItemsGroup>
                <SidebarItemsGroup header='Tags' border={'bottom'}>
                  
                    <TagInput id='tag-input' labelText='Add New Tag:' bottomCapture='Separate with commas or the Enter key.'/>
                 
                </SidebarItemsGroup>
            </>
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