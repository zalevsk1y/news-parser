import { SetAction } from 'types';
import { ParsedData } from 'types/sidebarTemplate'
import { SELECT, RESET, VISUAL_CONSTRUCTOR, PARSED_DATA, TITLE, FEATURED_MEDIA, CONTENT, DISELECT } from '../constants'

export const SELECT_TITLE = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${TITLE}:${SELECT}]`;
    export const SELECT_FEATURED_MEDIA = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${FEATURED_MEDIA}:${SELECT}]`;
    export const SELECT_CONTENT = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${CONTENT}:${SELECT}]`;
    export const REMOVE_CONTENT = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${CONTENT}:${DISELECT}]`;
    export const RESET_SIDEBAR_TEMPLATE = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}:${RESET}]`;



export const selectTitle: SetAction<string> = (title) => ({
        type: SELECT_TITLE,
        payload: title
    })
export const selectFeaturedMedia: SetAction<string> = (url) => ({
        type: SELECT_FEATURED_MEDIA,
        payload: url
    })
export const selectContent: SetAction<{
    hash: string,
    content: ParsedData
}> = (contentObj) => ({
        type: SELECT_CONTENT,
        payload: contentObj
    })
export const removeContent:SetAction<string> = (hash) => ({
        type: REMOVE_CONTENT,
        payload: hash
    })
export const resetSidebarTemplate = () => ({
        type: RESET_SIDEBAR_TEMPLATE,
    })