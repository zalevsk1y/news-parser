import React from "react";
import { InfoBody, InfoBox } from "@news-parser/ui/sidebar";
import { ExtraOptionsGroup } from '../../groups/template-groups/ExtraOptionsGroup';
import { COMPONENTS } from "@news-parser/config/i18n";

export const ExtraOptionsSection = () => {
    return (
        <InfoBox title={COMPONENTS.SIDEBAR_RIGHT.SECTIONS_TITLE.EXTRA_OPTIONS}>
            <InfoBody>
                <ExtraOptionsGroup />
            </InfoBody>
        </InfoBox>
    )
}