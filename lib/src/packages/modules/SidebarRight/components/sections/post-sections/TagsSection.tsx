import React from 'react';
import { InfoBox, InfoBody } from '@news-parser/ui/sidebar/InfoBox';
import TagsGroup from '../../groups/post-groups/TagsGroup';

/**
 * Component representing the right sidebar section for post tags.
 * @component
 * @returns {JSX.Element} The rendered SidebarRightPost component.
 */


export const TagsSection: React.FC = () => (
    <InfoBox title='Tags'>
        <InfoBody>
            <TagsGroup />
        </InfoBody>
    </InfoBox>
);
