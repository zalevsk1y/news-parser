import { SELECT, RESET, VISUAL_CONSTRUCTOR, PARSED_DATA, TITLE, FEATURED_MEDIA, CONTENT, DISELECT } from '../constants'

export const SELECT_TITLE = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${TITLE}:${SELECT}]`,
    SELECT_FEATURED_MEDIA = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${FEATURED_MEDIA}:${SELECT}]`,
    SELECT_CONTENT = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${CONTENT}:${SELECT}]`,
    REMOVE_CONTENT = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${CONTENT}:${DISELECT}]`,
    RESET_SIDEBAR_TEMPLATE = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}:${RESET}]`;



export const selectTitle = (title) => {
    return {
        type: SELECT_TITLE,
        payload: {
            title
        }
    }
}
export const selectFeaturedMedia = (url) => {
    return {
        type: SELECT_FEATURED_MEDIA,
        payload: {
            url
        }
    }
}
export const selectContent = (hash, content) => {
    return {
        type: SELECT_CONTENT,
        payload: {
            hash,
            content
        }
    }
}
export const removeContent = (hash) => {
    return {
        type: REMOVE_CONTENT,
        payload: {
            hash
        }
    }
}
export const resetSidebarTemplate = () => {
    return {
        type: RESET_SIDEBAR_TEMPLATE,
    }
}