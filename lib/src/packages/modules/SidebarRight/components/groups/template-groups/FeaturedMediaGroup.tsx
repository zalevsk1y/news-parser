import React from 'react'
import { Checkbox } from '@news-parser/ui/sidebar/';
import { SidebarItemLabel, SidebarItem } from '@news-parser/ui/sidebar';
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
    const featuredImageClassName = !addFeaturedMedia
        ? 'featured-image-thumbnail no-featured-image'
        : 'featured-image-thumbnail';
    return (
        <>
            <SidebarItem>
                <Image
                    src={featuredMedia}
                    className={featuredImageClassName}
                    alt='Featured image thumbnail'
                    defaultImage={config.defaultImage}
                />
            </SidebarItem>
            <SidebarItem>
                <p className='howto'>
                    If you want to change featured image, select image you would like
                    to choose in the constructor and click &apos;Change image&apos; button.
                </p>
            </SidebarItem>
            <SidebarItem>
                <Checkbox
                    checked={!addFeaturedMedia}
                    onChange={toggleAddFeaturedMediaHandler}
                    id='no-post-featured-media-checkbox'
                />
                <SidebarItemLabel className='howto inline-bl' htmlFor='no-post-featured-media-checkbox'>No featured image.</SidebarItemLabel>
            </SidebarItem>
        </>
    )
}