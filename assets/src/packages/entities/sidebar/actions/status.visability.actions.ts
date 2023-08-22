import { SetAction } from "types";
import { Sidebar } from "types/sidebar";
import { SIDEBAR, SET, PUBLISH_DATE, PUBLISH_INTERVAL, POST_FORMAT, POST_STATUS } from "../constants";

// [sidebar.publish.date:set]
export const SET_POST_PUBLISH_DATE = `[${SIDEBAR}.${PUBLISH_DATE}:${SET}}`;
    // [sidebar.postFormat:set]
    export const SET_POST_FORMAT = `[${SIDEBAR}.${POST_FORMAT}:${SET}]`;
    // [sidebar.status:set]
    export const SET_POST_STATUS = `[${SIDEBAR}.${POST_STATUS}:${SET}]`

    // date format ISO 8601 - 2022-08-21T15:30
export const publishDateSet:SetAction<string|false> = (date) => ({
        type: SET_POST_PUBLISH_DATE,
        payload: date
    })

export const postFormatSet:SetAction<Sidebar['postFormat']> = postFormat => ({
        type: SET_POST_FORMAT,
        payload:postFormat
    })

export const postStatusSet:SetAction<Sidebar['status']> = postStatus => ({
        type: SET_POST_STATUS,
        payload:postStatus
    })
