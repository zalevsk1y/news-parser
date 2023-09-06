import { createAction } from "@reduxjs/toolkit";
import { VISUAL_CONSTRUCTOR } from "../constants";
// state properties name
import { OPTIONS, ADD_FEATURED_MEDIA, ADD_SOURCE, SAVE_PARSING_TEMPLATE } from '../constants';
// actions name
import { TOGGLE } from '../constants';

export const TOGGLE_ADD_FEATURED_MEDIA = `[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${ADD_FEATURED_MEDIA}:${TOGGLE}]`;
export const TOGGLE_ADD_SOURCE = `[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${ADD_SOURCE}:${TOGGLE}]`;
export const TOGGLE_SAVE_PARSING_TEMPLATE = `[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${SAVE_PARSING_TEMPLATE}:${TOGGLE}]`;

export const toggleAddFeaturedMedia = createAction(TOGGLE_ADD_FEATURED_MEDIA);

export const toggleAddSource = createAction(TOGGLE_ADD_SOURCE);

export const toggleSaveParsingTemplate = createAction(TOGGLE_SAVE_PARSING_TEMPLATE);
