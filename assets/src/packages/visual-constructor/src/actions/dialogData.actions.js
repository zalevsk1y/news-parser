// package name
import { VISUAL_CONSTRUCTOR } from "../constants";
//state properties name
import { DIALOG_DATA, IS_OPEN, FRAME_IS_READY_PROP, RAW_HTML, FETCHING } from "../constants";
//middleware path
import { API, HTML } from "../constants";
//actions name
import { START, STOP, CLOSE, OPEN, READY, FETCH, SET } from "../constants";

export const START_FETCHING = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${FETCHING}:${START}]`,
  STOP_FETCHING = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${FETCHING}:${STOP}]`,
  CLOSE_DIALOG = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_OPEN}:${CLOSE}]`,
  OPEN_DIALOG = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${IS_OPEN}:${OPEN}]`,
  FRAME_IS_READY = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${FRAME_IS_READY_PROP}:${READY}]`,
  FETCH_HTML = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${RAW_HTML}:${FETCH}]${API}/${HTML}`,
  SET_HTML = `[${VISUAL_CONSTRUCTOR}.${DIALOG_DATA}.${RAW_HTML}:${SET}]`;

export const startFetching = (entity, event, data) => {
  return {
    type: START_FETCHING,
    payload: {
      entity,
      event,
      data,
    },
  };
};

export const stopFetching = () => {
  return {
    type: STOP_FETCHING,
  };
};

export const openDialog = (url, _id) => {
  return {
    type: OPEN_DIALOG,
    payload: {
      url,
      _id,
    },
  };
};

export const closeDialog = () => {
  return {
    type: CLOSE_DIALOG,
  };
};

export const frameIsReady = () => {
  return {
    type: FRAME_IS_READY,
  };
};

export const fetchHTML = (url) => {
  return {
    type: FETCH_HTML,
    payload: {
      data: {
        url,
      },
    },
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
