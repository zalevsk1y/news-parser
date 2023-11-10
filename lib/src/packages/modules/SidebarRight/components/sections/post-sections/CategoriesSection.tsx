import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import CategoriesGroup from '../../groups/post-groups/CategoriesGroup';
import { COMPONENTS } from '@news-parser/config/i18n';

/**
 * Component representing the right sidebar section for post categories.
 * @component
 * @returns {JSX.Element} The rendered SidebarRightPost component.
 */

export const CategoriesSection:React.FC = () => (
      <InfoBox title={COMPONENTS.SIDEBAR_RIGHT.SECTIONS_TITLE.CATEGORIES}>
        <InfoBody>
          <CategoriesGroup />
        </InfoBody>
      </InfoBox>
  );
