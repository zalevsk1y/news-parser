import { SIDEBAR, TOGGLE, ALLOW_PINBACKS, ALLOW_COMMENTS } from "../constants";

// [sidebar.allowPinbacks:toggle]
export const ALLOW_POST_PINBACKS = `[${SIDEBAR}.${ALLOW_PINBACKS}:${TOGGLE}}`,
    // [sidebar.allowComments:toggle]
    ALLOW_POST_COMMENTS = `[${SIDEBAR}.${ALLOW_COMMENTS}:${TOGGLE}]`;

export const allowPinbacksSet = checked => {
    return {
        type: ALLOW_POST_PINBACKS,
        payload: {
            checked
        }
    }
}

export const allowCommentsSet = checked => {
    return {
        type: ALLOW_POST_COMMENTS,
        payload: {
            checked
        }
    }
}