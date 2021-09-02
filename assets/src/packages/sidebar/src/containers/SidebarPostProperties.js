import React, { useCallback } from 'react';

import { SidebarItemLabel } from '../components/SidebarItemLabel';
import { SidebarItem } from '../components/SidebarItem';
import CategoriesGroup  from './sidebar-groups/CategoriesGroup';
import  TagsGroup  from './sidebar-groups/TagsGroup';
import { connect } from 'react-redux';
import { parseSelectedWithProps } from '@news-parser/parser-rss/actions/page.actions';
import  StatusVisibilityGroup  from './sidebar-groups/StatusVisibilityGroup'
import  DiscussionGroup  from './sidebar-groups/DiscussionGroup';

export function SidebarPostProperties (props){
        const isSelected=props.postsSelected.length>0,
            parseSelected=useCallback(()=>{
                isSelected&&props.parseSelected(props.sidebar);
            })
        return(
            <>
                <StatusVisibilityGroup />
                <CategoriesGroup />
                <TagsGroup />
                <DiscussionGroup />
                
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
        sidebar:state.parse.sidebar
    }
}
function mapDispatchToProps(dispatch){
    return {
        parseSelected:postProps=>{
            dispatch(parseSelectedWithProps(postProps))
        }
    }
}
export default connect (mapStateToProps,mapDispatchToProps)(SidebarPostProperties)