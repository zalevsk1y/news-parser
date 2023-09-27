
import { createReducer } from '@reduxjs/toolkit';
import { openVisualConstructor, closeVisualConstructor, setHTML, setIsMutating } from '../actions/dialogData.actions';
import { initialState, DialogDataType } from './initialState';

export const dialogData = createReducer<DialogDataType>(initialState, (builder) => {
  builder
    .addCase(openVisualConstructor, (state, action) => {
      return {
        ...state,
        isOpen: true,
        url: action.payload.url,
        _id: action.payload._id
      };
    })
    .addCase(closeVisualConstructor, (state) => {
      return {
        ...state,
        isOpen: false,
        frameIsReady: false,
        rawHTML: false
      };
    })
    .addCase(setHTML, (state, action) => {
      return {
        ...state,
        rawHTML: action.payload
      };
    })
    .addCase(setIsMutating, (state, action) => {
      return {
        ...state,
        isMutating: action.payload
      };
    });
});
