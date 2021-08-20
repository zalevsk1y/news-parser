import React, { useCallback } from 'react';
import { Select } from '../components/Select';
import { SidebarItemLabel } from '../components/SidebarItemLabel';
import { SidebarItem } from '../components/SidebarItem';
import { SidebarItemsGroup } from '../components/SidebarItemsGroup';
import { PopUpTimeDate } from '../components/PopUpTimeDate';
import { SidebarItemExpandable } from '../components/SidebarItemExpandable';
import { TagInput } from '../components/TagInput';
import { connect } from 'react-redux';
import { parseSelected } from '@news-parser/parser-rss/actions/page.actions';
import { CategoriesCheckboxList } from '../components/CategoriesCheckboxList';
import { CategoiresOptionList } from '../components/CategoiresOptionList';

export function SidebarPostProperties (props){
        const categoryName="cars",
            isSelected=props.postsSelected.length>0,
            parseSelected=useCallback(()=>{
                isSelected&&props.parseSelected();
            })
        return(
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
                        <CategoriesCheckboxList categories={props.categories} id={0} />
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
                                <CategoiresOptionList id={0} categories={props.categories} />
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
                <SidebarItemsGroup header='Discussion' border={'bottom'}>
                    <SidebarItem>
                        <input type='checkbox' className='sidebar-item-radio' name='allowComments' checked></input>
                        <SidebarItemLabel>
                            Allow comments
                        </SidebarItemLabel>
                    </SidebarItem>    
                    <SidebarItem>
                        <input type='checkbox' className='sidebar-item-radio' name='allowPingbacks' checked></input>
                        <SidebarItemLabel>
                            Allow pingbacks & trackbacks
                        </SidebarItemLabel>
                    </SidebarItem>
                </SidebarItemsGroup>
                {
                    isSelected&&
                    <SidebarItem>
                        <SidebarItemLabel></SidebarItemLabel>
                        <button className='sidebar-submit-button' onClick={parseSelected}>Parse Selected</button>
                    </SidebarItem>
                }   
            </>
        )
}

function mapStateToProps(state){
    
    return {
        postsSelected:Object.keys(state.parse.items.select),
        categories:state.parse.sidebar.categories
    }
}
function mapDispatchToProps(dispatch){
    return {
        parseSelected:function (){
            dispatch(parseSelected())
        }
    }
}
export default connect (mapStateToProps,mapDispatchToProps)(SidebarPostProperties)