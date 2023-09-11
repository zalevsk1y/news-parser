import React from 'react';
import { InfoBox } from '@news-parser/ui/sidebar/InfoBox';
import { FeaturedMediaGroup } from '../sidebar-template-groups/FeaturedMediaGroup';
import { PostTitleGroup } from '../sidebar-template-groups/PostTitleGroup';
import { ExtraOptionsGroup } from '../sidebar-template-groups/ExtraOptionsGroup';

/**
 * Right side Main bar of visual constructor modal window.
 *
 * @since 2.0.0
 */

export const SidebarRightTemplate:React.FC = () => (

    <div className='inner-sidebar-container' role='tabpanel'>
      <InfoBox title='Featured Image'>
       <FeaturedMediaGroup />
      </InfoBox>
      <InfoBox title='Post title'>
        <PostTitleGroup />
      </InfoBox>
      <InfoBox title='Extra options'>
        <ExtraOptionsGroup />
      </InfoBox>
    </div>

  );



