// package name
import { VISUAL_CONSTRUCTOR } from "../../../visual-constructor/src/constants";
//state properties name
import { DIALOG_DATA, IS_OPEN, RAW_HTML } from "../../../visual-constructor/src/constants";
//actions name
import { CLOSE, OPEN, SET } from "../../../visual-constructor/src/constants";

// [visual-constructor.dialogData.isOpen:close]
export const CLOSE_VISUAL_CONSTRUCTOR = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_OPEN}:${CLOSE}]`,
// [visual-constructor.dialogData.isOpen:open]
  OPEN_VISUAL_CONSTRUCTOR = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_OPEN}:${OPEN}]`,
// [visual-constructor.dialogData.rawHtml:set]
  SET_HTML = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${RAW_HTML}:${SET}]`;


export const openVisualConstructor = (url, _id) => {
  return {
    type: OPEN_VISUAL_CONSTRUCTOR,
    payload: {
      url,
      _id,
    },
  };
};

export const closeVisulaConstructor = () => {
  return {
    type: CLOSE_VISUAL_CONSTRUCTOR,
  };
};

export const setHTML = (htmlData) => {
  return {
    type: SET_HTML,
    payload: {
      rawHTML: htmlData,
    },
  };
};
