
import { createReducer } from '@reduxjs/toolkit';
import { openVisualConstructor, closeVisualConstructor, setHTML, setIsMutating, addDialogCache } from '../actions/dialogData.actions';
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
        url: false,
        isOpen: false,
        frameIsReady: false,
        rawHTML: false,
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
    })
    .addCase(addDialogCache, (state, action) => {
      let newCache: false | Record<string, string> = false;
      const newCacheItem = action.payload;
      if (state.cache !== false) {
        newCache = { ...state.cache, ...newCacheItem };
      } else {
        newCache = newCacheItem;
      }
      return {
        ...state,
        cache: newCache
      };

    })
});
