import { SetAction } from "@news-parser/types";
import { SIDEBAR, TOGGLE, ALLOW_PINBACKS, ALLOW_COMMENTS } from "../constants";
// [sidebar.allowPinbacks:toggle]
export const ALLOW_POST_PINBACKS = `[${SIDEBAR}.${ALLOW_PINBACKS}:${TOGGLE}}`;
    // [sidebar.allowComments:toggle]
    export const ALLOW_POST_COMMENTS = `[${SIDEBAR}.${ALLOW_COMMENTS}:${TOGGLE}]`;

export const allowPinbacksSet:SetAction<boolean> = (value) => ({
        type: ALLOW_POST_PINBACKS,
        payload:value
    })

export const allowCommentsSet:SetAction<boolean> = (value) => ({
        type: ALLOW_POST_COMMENTS,
        payload:value
    })