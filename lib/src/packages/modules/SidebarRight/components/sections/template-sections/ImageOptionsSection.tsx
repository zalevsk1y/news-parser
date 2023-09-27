import React from "react";
import { InfoBody, InfoBox } from "@news-parser/ui/sidebar";
import { ImageOptionsGroup } from '../../groups/template-groups/ImageOptionsGroup';

export const ImageOptionsSection = () => {
    return (
        <InfoBox title='Image options'>
            <InfoBody>
                <ImageOptionsGroup />
            </InfoBody>
        </InfoBox>
    )
}