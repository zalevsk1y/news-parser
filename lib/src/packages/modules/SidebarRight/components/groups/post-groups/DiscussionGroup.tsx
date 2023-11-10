import React from 'react';
import { SidebarItemLabel, SidebarItem } from '@news-parser/ui/sidebar';
import { useGetDiscussionGroup, useSelectDiscussionGroup } from '@news-parser/entities/sidebar/hooks';
import { COMPONENTS } from '@news-parser/config/i18n';


/**
 * React functional component for rendering a discussion group with checkboxes for allowing comments and pinbacks.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

const DiscussionGroup: React.FC = () => {
  const [allowComments, allowPinbacks] = useGetDiscussionGroup();
  const [allowCommentsSet, allowPinbacksSet] = useSelectDiscussionGroup();
  return (
    <>
      <SidebarItem>
        <input
          type='checkbox'
          className='sidebar-item-radio'
          id='allow-comments-checkbox'
          name='allowComments'
          checked={allowComments}
          onChange={allowCommentsSet}
        />
        <SidebarItemLabel htmlFor='allow-comments-checkbox'>{COMPONENTS.SIDEBAR_RIGHT.DISCUSSION_GROUP.ALLOW_COMMENTS}</SidebarItemLabel>
      </SidebarItem>
      <SidebarItem>
        <input
          type='checkbox'
          className='sidebar-item-radio'
          id='allow-pinbacks-checkbox'
          name='allowPingbacks'
          checked={allowPinbacks}
          onChange={allowPinbacksSet}
        />
        <SidebarItemLabel htmlFor='allow-pinbacks-checkbox'>
          {COMPONENTS.SIDEBAR_RIGHT.DISCUSSION_GROUP.ALLOW_PINGBACKS}
        </SidebarItemLabel>
      </SidebarItem>
    </>
  )
}

export default DiscussionGroup