import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { mapTags, pushTag, selectTag, diselectTag } from '../actions/tag.actions';
import { publishDateSet, postFormatSet, postStatusSet } from '../actions/status.visability.actions'
import { allowPinbacksSet, allowCommentsSet } from '../actions/descussion.actions'
import { mapCategories, pushCategory, selectCategory, diselectCategory } from '../actions/category.actions'
import { resetSidebar } from '../actions/main.actions';
import {ParserRootState} from 'types/state';

type SidebarDataType=ParserRootState['parse']['sidebar']

export const sidebar = createReducer<SidebarDataType>(initialState, (builder) => {
    builder
        // Main
        .addCase(resetSidebar, (state) => ({
            ...initialState,
            categories: state.categories,
            tags: state.tags
        }))
        // Catagories
        .addCase(mapCategories, (state, action) => ({
            ...state,
            categories: action.payload
        }))
        .addCase(pushCategory, (state, action) => ({
            ...state,
            categories: state.categories.concat(action.payload)
        }))
        .addCase(selectCategory, (state, action) => {
            if (state.selectedCategories.includes(action.payload)) return state;
            return {
                ...state,
                selectedCategories: [...state.selectedCategories, action.payload]
            };
        })
        .addCase(diselectCategory, (state, action) => {
            if (!state.selectedCategories.includes(action.payload)) return state;
            return {
                ...state,
                selectedCategories: state.selectedCategories.filter(
                    (categoryId) => categoryId !== action.payload
                )
            };
        })
        // Tags
        .addCase(mapTags, (state, action) => ({
            ...state,
            tags: { ...action.payload }
        }))
        .addCase(pushTag, (state, action) => ({
            ...state,
            tags: { ...state.tags, [action.payload.name]: action.payload }
        }))
        .addCase(selectTag, (state, action) => ({
            ...state,
            selectedTags: [...state.selectedTags, action.payload]
        }))
        .addCase(diselectTag, (state, action) => ({
            ...state,
            selectedTags: state.selectedTags.filter((tagId) => tagId !== action.payload)
        }))
        // Status&Visibility
        .addCase(publishDateSet, (state, action) => ({
            ...state,
            publish: {
                date: action.payload
            }
        }))
        .addCase(postFormatSet, (state, action) => ({
            ...state,
            postFormat: action.payload
        }))
        .addCase(postStatusSet, (state, action) => ({
            ...state,
            status: action.payload
        }))
        // Descussion
        .addCase(allowCommentsSet, (state, action) => ({
            ...state,
            allowComments: action.payload
        }))
        .addCase(allowPinbacksSet, (state, action) => ({
            ...state,
            allowPinbacks: action.payload
        }));
});
