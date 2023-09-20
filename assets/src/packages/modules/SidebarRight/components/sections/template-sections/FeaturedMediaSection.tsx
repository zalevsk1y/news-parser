import React from 'react'
import { InfoBox, InfoBody, InfoFooter } from '@news-parser/ui/sidebar/';
import { useChangeFeaturedMedia } from '@news-parser/entities/sidebarTemplate/hooks'
import { FeaturedMediaGroup } from '../../groups/template-groups/FeaturedMediaGroup';

/**
 * React functional component for rendering a section related to the featured media.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

export const FeaturedMediaSection: React.FC = () => {
    const changeFeaturedMediaHandler = useChangeFeaturedMedia();
    return (
        <InfoBox title='Featured Image'>
            <InfoBody>
                <FeaturedMediaGroup />
            </InfoBody>
            <InfoFooter>
                <button
                    type='button'
                    className='button button-primary button-large'
                    onClick={changeFeaturedMediaHandler}
                >
                    Change image
                </button>
            </InfoFooter>
        </InfoBox>
    )
}