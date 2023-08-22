// package name
import { SetAction } from "@news-parser/types";
import { VISUAL_CONSTRUCTOR } from "../constants";
// state properties name
import { DIALOG_DATA, IS_OPEN, RAW_HTML,IS_MUTATING } from "../constants";
// actions name
import { CLOSE, OPEN, SET } from "../constants";


// [visual-constructor.dialogData.isOpen:close]
export const CLOSE_VISUAL_CONSTRUCTOR = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_OPEN}:${CLOSE}]`;
// [visual-constructor.dialogData.isOpen:open]
export const OPEN_VISUAL_CONSTRUCTOR = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_OPEN}:${OPEN}]`;
// [visual-constructor.dialogData.rawHtml:set]
export const SET_HTML = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${RAW_HTML}:${SET}]`;
// [visual-constructor.dialogData.isMutating:set]
export const  SET_IS_MUTATING=`[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_MUTATING}:${SET}]`;



export const openVisualConstructor:SetAction<{_id:number|undefined,url:string}> = (postData) => ({
    type: OPEN_VISUAL_CONSTRUCTOR,
    payload: postData
  });

export const closeVisulaConstructor = () => ({
    type: CLOSE_VISUAL_CONSTRUCTOR,
  });

export const setHTML:SetAction<string> = (htmlData) => ({
    type: SET_HTML,
    payload: htmlData
  });

export const setIsMutating:SetAction<boolean>=(state)=>({
    type: SET_IS_MUTATING,
    payload:state
  })