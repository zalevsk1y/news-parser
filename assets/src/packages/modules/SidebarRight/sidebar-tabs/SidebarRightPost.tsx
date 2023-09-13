import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import StatusVisibilityGroup from '../sidebar-post-groups/StatusVisibilityGroup';
import CategoriesGroup from '../sidebar-post-groups/CategoriesGroup';
import TagsGroup from '../sidebar-post-groups/TagsGroup';
import DiscussionGroup from '../sidebar-post-groups/DiscussionGroup';

/**
 * Right side Main bar of visual constructor modal window.
 *
 * @since 2.0.0
 */

export const SidebarRightPost:React.FC = () => (
    <div className='inner-sidebar-container' role='tabpanel'>
      <InfoBox title='Satus&Visibility'>
        <InfoBody>
          <StatusVisibilityGroup />
        </InfoBody>
      </InfoBox>
      <InfoBox title='Categories'>
        <InfoBody>
          <CategoriesGroup />
        </InfoBody>
      </InfoBox>
      <InfoBox title='Tags'>
        <InfoBody>
          <TagsGroup />
        </InfoBody>
      </InfoBox>
      <InfoBox title='Discussion'>
        <InfoBody>
          <DiscussionGroup />
        </InfoBody>
      </InfoBox>
    </div>

  );

  export default SidebarRightPost;