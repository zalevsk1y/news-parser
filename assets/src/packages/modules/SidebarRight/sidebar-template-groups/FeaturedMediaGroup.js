import React from 'react'
import { InfoBody, InfoFooter, Checkbox } from "@news-parser/ui/sidebar/";
import { Image } from "@news-parser/ui";
import { useGetPostFeaturedMedia, useGetAddFeaturedMedia, useSetFeaturedMedia, useToggleAddFeaturedMedia } from '@news-parser/entities/sidebarTemplate/hooks'
import config from '@news-parser/config';

export const FeaturedMediaGroup = () => {
    const featuredMedia = useGetPostFeaturedMedia();
    const addFeaturedMedia = useGetAddFeaturedMedia();
    const toggleAddFeaturedMediaHandler = useToggleAddFeaturedMedia();
    const selectFeaturedMediaHandler = useSetFeaturedMedia();
    const featuredImageClassName = addFeaturedMedia
        ? "featured-image-thumbnail no-featured-image"
        : "featured-image-thumbnail";

    return (
        <>
            <InfoBody>
                <Image
                    src={featuredMedia}
                    className={featuredImageClassName}
                    alt="Featured image thumbnail"
                    defaultImage={config.defaultImage}
                />
                <p className="howto">
                    If you want to change featured image, select image you would like
                    to choose in the constructor and click "Change image" button.
                </p>
                <Checkbox
                    value={!addFeaturedMedia}
                    onClick={toggleAddFeaturedMediaHandler}
                />
                <p className="howto inline-bl">No featured image.</p>
            </InfoBody>
            <InfoFooter>
                <button
                    type="button"
                    className="button button-primary button-large"
                    onClick={selectFeaturedMediaHandler}
                >
                    Change image
                </button>
            </InfoFooter>
        </>
    )
}