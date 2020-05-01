import React from 'react';
import { StatusVisibilitySection } from '../sections/post-sections/StatusVisibilitySection';
import { CategoriesSection } from '../sections/post-sections/CategoriesSection';
import { TagsSection } from '../sections/post-sections/TagsSection';
import {DiscussionSection} from '../sections/post-sections/DiscussionSection'

/**
 * Post tab of visual constructor modal window.
 * 
 */

export const SidebarRightPost:React.FC = () => (
    <div className='inner-sidebar-container' role='tabpanel'>
          <StatusVisibilitySection />
          <CategoriesSection />
          <TagsSection />
          <DiscussionSection />
    </div>
  );

  export default SidebarRightPost;