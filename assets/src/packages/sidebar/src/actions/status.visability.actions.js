import { SIDEBAR,SET,PUBLISH_DATE,PUBLISH_INTERVAL,POST_FORMAT,POST_STATUS } from "../constants";

export const publishDateSet=(date,time)=>{
    return {
        type:`[${SIDEBAR}:${PUBLISH_DATE}]${SET}`,
        payload:{
            date,
            time
        }
    }
}

export const publishIntervalSet=publishInterval=>{
    return {
        type:`[${SIDEBAR}:${PUBLISH_INTERVAL}]${SET}`,
        payload:{
            publishInterval
        }
    }
}

export const postFormatSet=postFormat=>{
    return {
        type:`[${SIDEBAR}:${POST_FORMAT}]${SET}`,
        payload:{
            postFormat
        }
    }
}

export const postStatusSet=postStatus=>{
    return {
        type:`[${SIDEBAR}:${POST_STATUS}]${SET}`,
        payload:{
            postStatus
        }
    }
}
