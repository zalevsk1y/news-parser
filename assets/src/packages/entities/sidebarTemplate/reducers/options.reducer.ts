import { createReducer } from '@reduxjs/toolkit';
import { toggleAddFeaturedMedia, toggleAddSource, toggleSaveParsingTemplate,toggleGroupImageRow } from '../actions/options.actions';
import { initialState } from './initialState';
import { OptionsDataType } from './initialState';

export const options = createReducer<OptionsDataType>(initialState.options, (builder) => {
    builder
        .addCase(toggleAddFeaturedMedia, (state) => ({
            ...state,
            addFeaturedMedia: !state.addFeaturedMedia
        }))
        .addCase(toggleAddSource, (state) => ({
            ...state,
            addSource: !state.addSource
        }))
        .addCase(toggleGroupImageRow, (state) => ({
            ...state,
            groupImagesRow: !state.groupImagesRow
        }))
        .addCase(toggleSaveParsingTemplate, (state) => ({
            ...state,
            saveParsingTemplate: !state.saveParsingTemplate
        }))
        
});
