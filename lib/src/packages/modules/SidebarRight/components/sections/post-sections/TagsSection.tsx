import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import TagsGroup from '../../groups/post-groups/TagsGroup';
import { COMPONENTS } from '@news-parser/config/i18n';

/**
 * Component representing the right sidebar section for post tags.
 * @component
 * @returns {JSX.Element} The rendered SidebarRightPost component.
 */


export const TagsSection: React.FC = () => (
    <InfoBox title={COMPONENTS.SIDEBAR_RIGHT.SECTIONS_TITLE.TAGS}>
        <InfoBody>
            <TagsGroup />
        </InfoBody>
    </InfoBox>
);
