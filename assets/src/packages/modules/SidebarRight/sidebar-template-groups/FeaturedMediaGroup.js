import React from 'react'
import { InfoBody, InfoFooter, Checkbox } from "@news-parser/ui/sidebar/";
import { Image } from "@news-parser/ui";
import { useGetPostFeaturedMedia, useGetAddFeaturedMedia, useChangeFeaturedMedia, useToggleAddFeaturedMedia } from '@news-parser/entities/sidebarTemplate/hooks'
import config from '@news-parser/config';

export const FeaturedMediaGroup = () => {
    const featuredMedia = useGetPostFeaturedMedia();
    const addFeaturedMedia = useGetAddFeaturedMedia();
    const toggleAddFeaturedMediaHandler = useToggleAddFeaturedMedia();
    const changeFeaturedMediaHandler = useChangeFeaturedMedia();
    const featuredImageClassName = !addFeaturedMedia
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
                    chekced={!addFeaturedMedia}
                    onChange={toggleAddFeaturedMediaHandler}
                />
                <p className="howto inline-bl">No featured image.</p>
            </InfoBody>
            <InfoFooter>
                <button
                    type="button"
                    className="button button-primary button-large"
                    onClick={changeFeaturedMediaHandler}
                >
                    Change image
                </button>
            </InfoFooter>
        </>
    )
}