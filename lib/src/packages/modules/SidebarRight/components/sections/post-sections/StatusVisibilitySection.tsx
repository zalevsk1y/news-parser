import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import StatusVisibilityGroup from '../../groups/post-groups/StatusVisibilityGroup';
import { COMPONENTS } from '@news-parser/config/i18n';

/**
 * Component representing the section for status and visibility in the sidebar.
 * @component
 * @returns {JSX.Element} The rendered StatusVisibilitySection component.
 */

export const StatusVisibilitySection:React.FC = () => (
      <InfoBox title={COMPONENTS.SIDEBAR_RIGHT.SECTIONS_TITLE.STATUS_VISIBILITY}>
        <InfoBody>
          <StatusVisibilityGroup />
        </InfoBody>
      </InfoBox>
  );
