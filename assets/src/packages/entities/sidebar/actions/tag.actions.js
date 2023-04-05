import { SIDEBAR, TAGS, TAG, MAP, SELECT, DISELECT, PUSH, CREATE, GET } from "../constants";

// [sidebar.tags:map]
export const MAP_POST_TAGS = `[${SIDEBAR}.${TAGS}:${MAP}]`,
    // [sidebar.tags:push]
    PUSH_POST_TAG = `[${SIDEBAR}.${TAG}:${PUSH}]`,
    // [sidebar.tags:create]tags
    CRAETE_POST_TAG = `[${SIDEBAR}.${TAG}:${CREATE}]${TAGS}`,
    // [sidebar.tags:select]
    SELECT_POST_TAG = `[${SIDEBAR}.${TAG}:${SELECT}]`,
    // [sidebar.tags:disselect]
    DISELECT_POST_TAG = `[${SIDEBAR}.${TAG}:${DISELECT}]`,
    // [sidebar.tags:get]tags
    GET_POST_TAGS = `[${SIDEBAR}.${TAGS}:${GET}]${TAG}`;

export const mapTags = (tagsArr) => {
    return {
        type: MAP_POST_TAGS,
        payload: tagsArr
    }
}

export const pushTag = (tagObject) => {
    return {
        type: PUSH_POST_TAG,
        payload: tagObject
    }
}

export const createTag = (name) => {
    return {
        type: CRAETE_POST_TAG,
        payload: {
            name
        }
    }
}

export const selectTag = (id) => {
    return {
        type: SELECT_POST_TAG,
        payload: {
            id
        }
    }
}

export const diselectTag = (id) => {
    return {
        type: DISELECT_POST_TAG,
        payload: {
            id
        }
    }
}

export const getTags = () => {
    return {
        type: GET_POST_TAGS,
        payload: {
            data: null
        }
    }
}

