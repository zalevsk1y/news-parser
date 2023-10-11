import { TemplateDataWithPostOptions } from 'types/template';
import { createAction } from '@reduxjs/toolkit';
import { TEMPLATE, GET, POST, PATCH, SET, DELETE, API } from '../constants';

export const GET_TEMPLATE = `[${TEMPLATE}:${GET}]${TEMPLATE}/${API}`;
export const CREATE_TEMPLATE = `[${TEMPLATE}:${POST}]${TEMPLATE}/${API}`;
export const UPDATE_TEMPLATE = `[${TEMPLATE}:${PATCH}]${TEMPLATE}/${API}`;
export const SET_TEMPLATE = `[${TEMPLATE}:${SET}]`;
export const DELETE_TEMPLATE = `[${TEMPLATE}:${DELETE}]${TEMPLATE}/${API}`;

export const getTemplate = createAction<string>(GET_TEMPLATE);

export const createTemplate = createAction<{ url: string, template: TemplateDataWithPostOptions }>(CREATE_TEMPLATE);

export const updateTemplate = createAction<{ url: string, template: TemplateDataWithPostOptions }>(UPDATE_TEMPLATE);

export const setTemplate = createAction<TemplateDataWithPostOptions>(SET_TEMPLATE);

export const deleteTemplate = createAction<TemplateDataWithPostOptions>(DELETE_TEMPLATE);
