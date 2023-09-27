import { createReducer } from '@reduxjs/toolkit';
import { setTemplates } from '../actions/templates.actions'
import { AutopilotRootState } from 'types/state';

type TemplatesDataType = AutopilotRootState['parse']['templates'];

export const templates = createReducer<TemplatesDataType>([], (builder) => {
  builder.addCase(setTemplates, (state, action) => {
    return [...action.payload];
  });
});
