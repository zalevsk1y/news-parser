import { SIDEBAR, SET, PUBLISH_DATE, PUBLISH_INTERVAL, POST_FORMAT, POST_STATUS } from "../constants";

// [sidebar.publish.date:set]
export const SET_POST_PUBLISH_DATE = `[${SIDEBAR}.${PUBLISH_DATE}:${SET}}`,
    // [sidebar.postFormat:set]
    SET_POST_FORMAT = `[${SIDEBAR}.${POST_FORMAT}:${SET}]`,
    // [sidebar.publishInterval:set]
    SET_PUBLISH_INTERVAL = `[${SIDEBAR}.${PUBLISH_INTERVAL}:${SET}]`,
    // [sidebar.status:set]
    SET_POST_STATUS = `[${SIDEBAR}.${POST_STATUS}:${SET}]`

export const publishDateSet = (date, time) => {
    return {
        type: SET_POST_PUBLISH_DATE,
        payload: {
            date,
            time
        }
    }
}

export const publishIntervalSet = publishInterval => {
    return {
        type: SRT_PUBLISH_INTERVAL,
        payload: {
            publishInterval
        }
    }
}

export const postFormatSet = postFormat => {
    return {
        type: SET_POST_FORMAT,
        payload: {
            postFormat
        }
    }
}

export const postStatusSet = postStatus => {
    return {
        type: SET_POST_STATUS,
        payload: {
            postStatus
        }
    }
}
