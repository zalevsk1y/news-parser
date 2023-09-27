import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import CategoriesGroup from '../../groups/post-groups/CategoriesGroup';

/**
 * Component representing the right sidebar section for post categories.
 * @component
 * @returns {JSX.Element} The rendered SidebarRightPost component.
 */

export const CategoriesSection:React.FC = () => (
      <InfoBox title='Categories'>
        <InfoBody>
          <CategoriesGroup />
        </InfoBody>
      </InfoBox>
  );
