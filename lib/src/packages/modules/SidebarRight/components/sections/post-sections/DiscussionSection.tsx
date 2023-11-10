import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import DiscussionGroup from '../../groups/post-groups/DiscussionGroup';
import { COMPONENTS } from '@news-parser/config/i18n';

/**
 * Component representing the section for Discussion options in the sidebar.
 * @component
 * @returns {JSX.Element} The rendered StatusVisibilitySection component.
 */

export const DiscussionSection:React.FC = () => (
      <InfoBox title={COMPONENTS.SIDEBAR_RIGHT.SECTIONS_TITLE.DISCUSSION}>
        <InfoBody>
          <DiscussionGroup />
        </InfoBody>
      </InfoBox>
  );
