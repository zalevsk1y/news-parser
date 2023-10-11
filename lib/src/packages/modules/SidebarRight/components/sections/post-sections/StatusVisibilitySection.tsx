import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import StatusVisibilityGroup from '../../groups/post-groups/StatusVisibilityGroup';

/**
 * Component representing the section for status and visibility in the sidebar.
 * @component
 * @returns {JSX.Element} The rendered StatusVisibilitySection component.
 */

export const StatusVisibilitySection:React.FC = () => (
      <InfoBox title='Satus&Visibility'>
        <InfoBody>
          <StatusVisibilityGroup />
        </InfoBody>
      </InfoBox>
  );
