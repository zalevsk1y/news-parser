import { SetAction } from "types";
import { Tag } from "types/sidebar";
import { SIDEBAR, TAGS, TAG, MAP, SELECT, DISELECT, PUSH, CREATE, GET } from "../constants";


// [sidebar.tags:map]
export const MAP_POST_TAGS = `[${SIDEBAR}.${TAGS}:${MAP}]`;
    // [sidebar.tags:push]
    export const PUSH_POST_TAG = `[${SIDEBAR}.${TAG}:${PUSH}]`;
    // [sidebar.tags:create]tags
    export const CRAETE_POST_TAG = `[${SIDEBAR}.${TAG}:${CREATE}]${TAGS}`;
    // [sidebar.tags:select]
    export const SELECT_POST_TAG = `[${SIDEBAR}.${TAG}:${SELECT}]`;
    // [sidebar.tags:disselect]
    export const DISELECT_POST_TAG = `[${SIDEBAR}.${TAG}:${DISELECT}]`;
    // [sidebar.tags:get]tags
    export const GET_POST_TAGS = `[${SIDEBAR}.${TAGS}:${GET}]${TAG}`;

/*
* Tags is stored as a hash map where key is tag name and value is Tag object
* {tagName:Tag}
*/
export const mapTags:SetAction<Record<string,Tag>> = (tagsMap) => ({
        type: MAP_POST_TAGS,
        payload: tagsMap
    })

export const pushTag:SetAction<Tag> = (tagObject) => ({
        type: PUSH_POST_TAG,
        payload: tagObject
    })


export const selectTag:SetAction<number> = (id) => ({
        type: SELECT_POST_TAG,
        payload: id
    })

export const diselectTag:SetAction<number> = (id) => ({
        type: DISELECT_POST_TAG,
        payload: id
    })

export const getTags = () => ({
        type: GET_POST_TAGS,
    })

