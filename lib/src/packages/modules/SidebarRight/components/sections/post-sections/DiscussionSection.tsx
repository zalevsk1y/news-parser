import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import DiscussionGroup from '../../groups/post-groups/DiscussionGroup';

/**
 * Component representing the section for Discussion options in the sidebar.
 * @component
 * @returns {JSX.Element} The rendered StatusVisibilitySection component.
 */

export const DiscussionSection:React.FC = () => (
      <InfoBox title='Discussion'>
        <InfoBody>
          <DiscussionGroup />
        </InfoBody>
      </InfoBox>
  );
