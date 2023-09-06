import { createReducer } from '@reduxjs/toolkit';
import { ParserRootState } from 'types/state';
import { setTemplate, deleteTemplate } from '../actions/template.actions'


type TemplateDataType=ParserRootState['parse']['template']
export const template = createReducer<TemplateDataType>(false, (builder) => {
    builder
        .addCase(setTemplate, (state, action) => {
            return action.payload;
        })
        .addCase(deleteTemplate, () => {
            return false;
        });
});
