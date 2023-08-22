import React from 'react'
import { InfoBody, InfoFooter, Checkbox } from '@news-parser/ui/sidebar/';
import { Image } from '@news-parser/ui/Image';
import { useGetPostFeaturedMedia, useGetAddFeaturedMedia, useChangeFeaturedMedia, useToggleAddFeaturedMedia } from '@news-parser/entities/sidebarTemplate/hooks'
import config from '@news-parser/config/index';

/**
 * React functional component for rendering a group related to the featured media.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

export const FeaturedMediaGroup: React.FC = () => {
    const featuredMedia = useGetPostFeaturedMedia();
    const addFeaturedMedia = useGetAddFeaturedMedia();
    const toggleAddFeaturedMediaHandler = useToggleAddFeaturedMedia();
    const changeFeaturedMediaHandler = useChangeFeaturedMedia();
    const featuredImageClassName = !addFeaturedMedia
        ? 'featured-image-thumbnail no-featured-image'
        : 'featured-image-thumbnail';

    return (
        <>
            <InfoBody>
                <Image
                    src={featuredMedia}
                    className={featuredImageClassName}
                    alt='Featured image thumbnail'
                    defaultImage={config.defaultImage}
                />
                <p className='howto'>
                    If you want to change featured image, select image you would like
                    to choose in the constructor and click 'Change image' button.
                </p>
                <Checkbox
                    checked={!addFeaturedMedia}
                    onChange={toggleAddFeaturedMediaHandler}
                />
                <p className='howto inline-bl'>No featured image.</p>
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
        </>
    )
}