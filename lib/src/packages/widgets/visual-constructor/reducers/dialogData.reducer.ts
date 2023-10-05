
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
      let newCache: false | Record<string, string> = false;

      if (state.cache !== false) {
        const newCacheItem = (state.url !== false&&state.rawHTML!==false) ? { [state.url]: state.rawHTML } : false;
        newCache = newCacheItem !== false ? { ...state.cache, ...newCacheItem  } : { ...state.cache };
      }

      return {
        ...state,
        url: false,
        isOpen: false,
        frameIsReady: false,
        rawHTML: false,
        cache: newCache
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
