import { createAction } from "@reduxjs/toolkit";
import { Sidebar } from "types/sidebar";
import { SIDEBAR, SET, PUBLISH_DATE, POST_FORMAT, POST_STATUS } from "../constants";

// [sidebar.publish.date:set]
export const SET_POST_PUBLISH_DATE = `[${SIDEBAR}.${PUBLISH_DATE}:${SET}}`;
// [sidebar.postFormat:set]
export const SET_POST_FORMAT = `[${SIDEBAR}.${POST_FORMAT}:${SET}]`;
// [sidebar.status:set]
export const SET_POST_STATUS = `[${SIDEBAR}.${POST_STATUS}:${SET}]`

// date format ISO 8601 - 2022-08-21T15:30

export const publishDateSet = createAction<string | false>(SET_POST_PUBLISH_DATE);

export const postFormatSet = createAction<Sidebar['postFormat']>(SET_POST_FORMAT);

export const postStatusSet = createAction<Sidebar['status']>(SET_POST_STATUS);

