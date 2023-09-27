import React from "react";
import { InfoBody, InfoBox } from "@news-parser/ui/sidebar";
import { ExtraOptionsGroup } from '../../groups/template-groups/ExtraOptionsGroup';

export const ExtraOptionsSection = () => {
    return (
        <InfoBox title='Extra options'>
            <InfoBody>
                <ExtraOptionsGroup />
            </InfoBody>
        </InfoBox>
    )
}