import { createAction } from "@reduxjs/toolkit";
import { VISUAL_CONSTRUCTOR } from "../constants";
// state properties name
import { OPTIONS, ADD_FEATURED_MEDIA, ADD_SOURCE, SAVE_PARSING_TEMPLATE, GROUP_IMAGES_ROW,ADD_SRCSET_AND_SIZES } from '../constants';
// actions name
import { TOGGLE } from '../constants';

export const TOGGLE_ADD_FEATURED_MEDIA = `[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${ADD_FEATURED_MEDIA}:${TOGGLE}]`;
export const TOGGLE_ADD_SOURCE = `[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${ADD_SOURCE}:${TOGGLE}]`;
export const TOGGLE_SAVE_PARSING_TEMPLATE = `[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${SAVE_PARSING_TEMPLATE}:${TOGGLE}]`;
export const TOGGLE_GROUP_IMAGES_ROW = `[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${GROUP_IMAGES_ROW}:${TOGGLE}]`
export const TOGGLE_ADD_SRCSET_AND_SIZES=`[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${ADD_SRCSET_AND_SIZES}:${TOGGLE}]`

export const toggleAddFeaturedMedia = createAction(TOGGLE_ADD_FEATURED_MEDIA);

export const toggleAddSource = createAction(TOGGLE_ADD_SOURCE);

export const toggleSaveParsingTemplate = createAction(TOGGLE_SAVE_PARSING_TEMPLATE);

export const toggleGroupImageRow = createAction(TOGGLE_GROUP_IMAGES_ROW);

export const toggleAddSrcSetAndSizes=createAction(ADD_SRCSET_AND_SIZES);