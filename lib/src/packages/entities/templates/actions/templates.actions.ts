import { createAction } from '@reduxjs/toolkit';
import { TEMPLATES, SET } from '../constants';

export const SET_TEMPLATES = `[${TEMPLATES}:${SET}]`;


export const setTemplates = createAction<Array<string>>(SET_TEMPLATES);
