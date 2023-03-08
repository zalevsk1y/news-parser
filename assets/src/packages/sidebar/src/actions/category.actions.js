import { SIDEBAR, CATEGORIES, CATEGORY, MAP, SELECT, DISELECT, CREATE, PUSH } from "../constants"

// [sidebar.categories:map]
export const MAP_POST_CATEGORIES = `[${SIDEBAR}.${CATEGORIES}:${MAP}]`,
    // [sidebar.categories:push]
    PUSH_POST_CATEGORY = `[${SIDEBAR}.${CATEGORY}:${PUSH}]`,
    // [sidebar.categories:create]categories
    CREATE_POST_CATEGORY = `[${SIDEBAR}.${CATEGORIES}:${CREATE}]${CATEGORIES}`,
    // [sidebar.categories:select]
    SELECT_POST_CATEGORY = `[${SIDEBAR}.${CATEGORIES}:${SELECT}]`,
    // [sidebar.categories:diselect]
    DISELECT_POST_CATEGORY = `[${SIDEBAR}:${CATEGORIES}]${DISELECT}`;


export const mapCategories = (categoriesArr) => {
    return {
        type: MAP_POST_CATEGORIES,
        payload: categoriesArr
    }
}

export const pushCategory = (categoryObject) => {
    return {
        type: PUSH_POST_CATEGORY,
        payload: categoryObject
    }
}

export const createCategory = (name, parent) => {
    return {
        type: CREATE_POST_CATEGORY,
        payload: {
            name,
            parent
        }
    }
}

export const selectCategory = (id) => {
    return {
        type: SELECT_POST_CATEGORY,
        payload: {
            id
        }
    }
}

export const diselectCategory = (id) => {
    return {
        type: DISELECT_POST_CATEGORY,
        payload: {
            id
        }
    }
}