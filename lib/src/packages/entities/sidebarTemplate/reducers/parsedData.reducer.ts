import { createReducer } from '@reduxjs/toolkit';
import { selectTitle, selectFeaturedMedia, selectContent, removeContent, resetSidebarTemplate } from '../actions/parsedData.actions';
import { initialState } from './initialState';
import { ParsedDataType } from './initialState';

export const parsedData = createReducer<ParsedDataType>(initialState.parsedData, (builder) => {
    builder
        .addCase(selectTitle, (state, action) => {
            state.title = action.payload;
        })
        .addCase(selectFeaturedMedia, (state, action) => {
            state.image = action.payload;
        })
        .addCase(selectContent, (state, action) => {
            state.body[action.payload.hash] = action.payload.content;
        })
        .addCase(removeContent, (state, action) => {
            const hash = action.payload;
            if (hash in state.body) {
                delete state.body[hash];
            }
        })
        .addCase(resetSidebarTemplate, () => {
            return initialState.parsedData;
        });
});



