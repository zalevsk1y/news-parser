// package name
import { createAction } from "@reduxjs/toolkit";
import { VISUAL_CONSTRUCTOR } from "../constants";
// state properties name
import { DIALOG_DATA, IS_OPEN, RAW_HTML, IS_MUTATING, CACHE } from "../constants";
// actions name
import { CLOSE, OPEN, SET, ADD } from "../constants";

// [visual-constructor.dialogData.isOpen:close]
export const CLOSE_VISUAL_CONSTRUCTOR = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_OPEN}:${CLOSE}]`;
// [visual-constructor.dialogData.isOpen:open]
export const OPEN_VISUAL_CONSTRUCTOR = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_OPEN}:${OPEN}]`;
// [visual-constructor.dialogData.rawHtml:set]
export const SET_HTML = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${RAW_HTML}:${SET}]`;
// [visual-constructor.dialogData.isMutating:set]
export const SET_IS_MUTATING = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_MUTATING}:${SET}]`;
// [visual-constructor.dialogData.isMutating:set]
export const ADD_HTML_CACHE = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${CACHE}:${ADD}]`;


export const closeVisualConstructor = createAction<void>(CLOSE_VISUAL_CONSTRUCTOR);

export const openVisualConstructor = createAction<{ _id: number | false, url: string }>(OPEN_VISUAL_CONSTRUCTOR);

export const setHTML = createAction<string>(SET_HTML);

export const setIsMutating = createAction<boolean>(SET_IS_MUTATING);

export const addDialogCache = createAction<Record<string, string>>(ADD_HTML_CACHE);