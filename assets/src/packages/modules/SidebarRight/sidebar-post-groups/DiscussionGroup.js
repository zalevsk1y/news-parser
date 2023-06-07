import React from 'react';

import { SidebarItemLabel, SidebarItem } from '@news-parser/ui/sidebar';
import { useGetDiscussionGroup, useSelectDiscussionGroup } from '@news-parser/entities/sidebar/hooks';

const DiscussionGroup = () => {
  const [allowComments, allowPinbacks] = useGetDiscussionGroup();
  const [allowCommentsSet, allowPinbacksSet] = useSelectDiscussionGroup();
  return (
    <>
      <SidebarItem>
        <input
          type="checkbox"
          className="sidebar-item-radio"
          name="allowComments"
          checked={allowComments}
          onChange={allowCommentsSet}
        />
        <SidebarItemLabel>Allow comments</SidebarItemLabel>
      </SidebarItem>
      <SidebarItem>
        <input
          type="checkbox"
          className="sidebar-item-radio"
          name="allowPingbacks"
          checked={allowPinbacks}
          onChange={allowPinbacksSet}
        />
        <SidebarItemLabel>
          Allow pingbacks & trackbacks
        </SidebarItemLabel>
      </SidebarItem>
    </>
  )
}

export default DiscussionGroup