import React from 'react';

import { SidebarItemLabel,SidebarItem } from '@news-parser/ui/sidebar'


const DiscussionGroup = () => {
    const [allowComments,allowPinbacks]=useGetDiscussionGroup();
    const [allowCommentsSet,allowPinbacksSet]=useSelectDiscussionGroup()
    const onChange = event => { 
    switch (event.target.name) {
    case 'allowComments':
    allowCommentsSet(event.target.checked)
    break
    case 'allowPingbacks':
    allowPinbacksSet(event.target.checked)
    break
    }
    }
    
    return (
    <>
    <SidebarItem>
    <input
           type="checkbox"
           className="sidebar-item-radio"
           name="allowComments"
           checked={allowComments}
           onChange={onChange}
         />
    <SidebarItemLabel>Allow comments</SidebarItemLabel>
    </SidebarItem>
    <SidebarItem>
    <input
           type="checkbox"
           className="sidebar-item-radio"
           name="allowPingbacks"
           checked={allowPinbacks}
           onChange={onChange}
         />
    <SidebarItemLabel>
    Allow pingbacks & trackbacks
    </SidebarItemLabel>
    </SidebarItem>
    </>
    )
    }
    
    export default DiscussionGroup