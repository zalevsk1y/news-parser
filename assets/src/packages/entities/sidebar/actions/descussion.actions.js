import { SIDEBAR, TOGGLE, ALLOW_PINBACKS, ALLOW_COMMENTS } from "../constants";

// [sidebar.allowPinbacks:toggle]
export const ALLOW_POST_PINBACKS = `[${SIDEBAR}.${ALLOW_PINBACKS}:${TOGGLE}}`,
    // [sidebar.allowComments:toggle]
    ALLOW_POST_COMMENTS = `[${SIDEBAR}.${ALLOW_COMMENTS}:${TOGGLE}]`;

export const allowPinbacksSet = () => {
    return {
        type: ALLOW_POST_PINBACKS,
       
    }
}

export const allowCommentsSet = () => {
    return {
        type: ALLOW_POST_COMMENTS,
       
    }
}