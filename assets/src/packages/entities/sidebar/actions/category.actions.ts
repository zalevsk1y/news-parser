import { Category } from "types/sidebar";
import { createAction } from "@reduxjs/toolkit";
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
export const GET_POST_CATEGORIES = `[${SIDEBAR}.${CATEGORIES}:${GET}]${CATEGORIES}`;


export const mapCategories = createAction<Category[]>(MAP_POST_CATEGORIES);

export const pushCategory = createAction<Category | Category[]>(PUSH_POST_CATEGORY);

export const createCategory = createAction<Category>(CREATE_POST_CATEGORY);

export const selectCategory = createAction<number>(SELECT_POST_CATEGORY);

export const diselectCategory = createAction<number>(DISELECT_POST_CATEGORY);

export const getCategories = createAction(GET_POST_CATEGORIES);
