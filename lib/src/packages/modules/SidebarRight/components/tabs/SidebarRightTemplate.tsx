import React from 'react';
import { FeaturedMediaSection } from '../sections/template-sections/FeaturedMediaSection';
import { ExtraOptionsSection } from '../sections/template-sections/ExtraOptionsSection';
import { ImageOptionsSection } from '../sections/template-sections/ImageOptionsSection';
import { PostTitleSection } from '../sections/template-sections/PostTitleSection';

/**
 * Template tab of visual constructor modal window.
 *
 */

export const SidebarRightTemplate: React.FC = () => (

  <div className='inner-sidebar-container' role='tabpanel'>
    <FeaturedMediaSection />
    <PostTitleSection />
    <ImageOptionsSection />
    <ExtraOptionsSection />
  </div>

);



export default SidebarRightTemplate;