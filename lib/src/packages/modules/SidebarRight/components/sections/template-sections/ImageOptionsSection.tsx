import React from "react";
import { InfoBody, InfoBox } from "@news-parser/ui/sidebar";
import { ImageOptionsGroup } from '../../groups/template-groups/ImageOptionsGroup';
import { COMPONENTS } from "@news-parser/config/i18n";

export const ImageOptionsSection = () => {
    return (
        <InfoBox title={COMPONENTS.SIDEBAR_RIGHT.SECTIONS_TITLE.IMAGE_OPTIONS}>
            <InfoBody>
                <ImageOptionsGroup />
            </InfoBody>
        </InfoBox>
    )
}