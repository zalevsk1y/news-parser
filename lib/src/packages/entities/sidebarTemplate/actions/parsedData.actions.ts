import { createAction } from '@reduxjs/toolkit';
import { ParsedData } from 'types/sidebarTemplate'
import { SELECT, RESET, VISUAL_CONSTRUCTOR, PARSED_DATA, TITLE, FEATURED_MEDIA, CONTENT, DISELECT } from '../constants'

export const SELECT_TITLE = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${TITLE}:${SELECT}]`;
export const SELECT_FEATURED_MEDIA = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${FEATURED_MEDIA}:${SELECT}]`;
export const SELECT_CONTENT = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${CONTENT}:${SELECT}]`;
export const REMOVE_CONTENT = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${CONTENT}:${DISELECT}]`;
export const RESET_SIDEBAR_TEMPLATE = `[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}:${RESET}]`;

export const selectTitle = createAction<string>(SELECT_TITLE);

export const selectFeaturedMedia = createAction<string>(SELECT_FEATURED_MEDIA);

export const selectContent = createAction<{ hash: string, content: ParsedData }>(SELECT_CONTENT);

export const removeContent = createAction<string>(REMOVE_CONTENT);

export const resetSidebarTemplate = createAction(RESET_SIDEBAR_TEMPLATE);
