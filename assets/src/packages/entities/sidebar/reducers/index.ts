import { Action } from "@news-parser/types";
import { Sidebar } from "types/sidebar";
import { initialState } from "./initialState";
import { MAP_POST_TAGS, PUSH_POST_TAG, SELECT_POST_TAG, DISELECT_POST_TAG } from '../actions/tag.actions';
import { SET_POST_PUBLISH_DATE, SET_POST_FORMAT, SET_POST_STATUS } from '../actions/status.visability.actions'
import { ALLOW_POST_PINBACKS, ALLOW_POST_COMMENTS } from '../actions/descussion.actions'
import { MAP_POST_CATEGORIES, PUSH_POST_CATEGORY, SELECT_POST_CATEGORY, DISELECT_POST_CATEGORY } from '../actions/category.actions'
import { RESET_SIDEBAR } from '../actions/main.actions';

export const sidebar = (state: Sidebar = initialState, action: Action) => {

    switch (action.type) {
        // Main
        case RESET_SIDEBAR:
            return { ...initialState, 
                categories:state.categories, 
                tags:state.tags 
            };
        // Catagories
        case MAP_POST_CATEGORIES:
            return { ...state, categories: action.payload }
        case PUSH_POST_CATEGORY:
            return { ...state, categories: state.categories.concat(action.payload) }
        case SELECT_POST_CATEGORY:
            if (state.selectedCategories.includes(action.payload)) return { ...state }
            return { ...state, selectedCategories: [...state.selectedCategories, action.payload] }
        case DISELECT_POST_CATEGORY:
            if (!state.selectedCategories.includes(action.payload)) return { ...state }
            return { ...state, selectedCategories: state.selectedCategories.filter(categoryId => categoryId !== action.payload) }
        // Tags
        case MAP_POST_TAGS:
            return { ...state, tags: { ...action.payload } }
        case PUSH_POST_TAG:
            return { ...state, tags: { ...state.tags, [action.payload.name]: action.payload } }
        case SELECT_POST_TAG:
            return { ...state, selectedTags: [...state.selectedTags, action.payload] }
        case DISELECT_POST_TAG:
            return { ...state, selectedTags: state.selectedTags.filter(tagId => tagId !== action.payload) }
        // Status&Visibility
        case SET_POST_PUBLISH_DATE:
            return { ...state, publish: action.payload }
        case SET_POST_FORMAT:
            return { ...state, postFormat: action.payload }
        case SET_POST_STATUS:
            return { ...state, status: action.payload }
        // descussion
        case ALLOW_POST_COMMENTS:
            return { ...state, allowComments: action.payload }
        case ALLOW_POST_PINBACKS:
            return { ...state, allowPinbacks: action.payload }

        default:
            return state;
    }
}