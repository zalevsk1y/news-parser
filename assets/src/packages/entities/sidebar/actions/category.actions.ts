import { Category } from "types/sidebar";
import { SetAction } from "types";
import { SIDEBAR, CATEGORIES, CATEGORY, MAP, SELECT, DISELECT, CREATE, PUSH, GET } from "../constants"

// [sidebar.categories:map]
export const MAP_POST_CATEGORIES = `[${SIDEBAR}.${CATEGORIES}:${MAP}]`;
    // [sidebar.categories:push]
    export const PUSH_POST_CATEGORY = `[${SIDEBAR}.${CATEGORY}:${PUSH}]`;
    // [sidebar.categories:create]categories
    export const CREATE_POST_CATEGORY = `[${SIDEBAR}.${CATEGORIES}:${CREATE}]${CATEGORIES}`;
    // [sidebar.categories:select]
    export const SELECT_POST_CATEGORY = `[${SIDEBAR}.${CATEGORIES}:${SELECT}]`;
    // [sidebar.categories:diselect]
    export const DISELECT_POST_CATEGORY = `[${SIDEBAR}:${CATEGORIES}]${DISELECT}`;
    // [sidebar.categories:get]categories
    export const GET_POST_CATEGORIES=`[${SIDEBAR}.${CATEGORIES}:${GET}]${CATEGORIES}`;

export const mapCategories:SetAction<Category[]> = (categoriesArr) => ({
        type: MAP_POST_CATEGORIES,
        payload: categoriesArr
    })

export const pushCategory:SetAction<Category|Category[]> = (categoryObject) => ({
        type: PUSH_POST_CATEGORY,
        payload: categoryObject
    })

export const createCategory:SetAction<Category> = (categoryObject) => ({
        type: CREATE_POST_CATEGORY,
        payload: categoryObject
    })

export const selectCategory:SetAction<number> = (id) => ({
        type: SELECT_POST_CATEGORY,
        payload: id
    })

export const diselectCategory:SetAction<number> = (id) => ({
        type: DISELECT_POST_CATEGORY,
        payload: id
        
    })

export const getCategories=()=>({
        type: GET_POST_CATEGORIES
    })