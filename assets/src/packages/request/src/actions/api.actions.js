import { REQUEST_API,API } from "../constants"

export function apiRequest(entity,event,data){
    return {
        type:`[${REQUEST_API}.${entity}:${event}]${API}`,
        payload:{
            entity,
            event,
            data
        }
    }
}
export function apiSuccess(entity,event,data){
    return {
        type:`[${entity}.${event}:${API_SUCCESS}]`,
        payload:{
            response:data
        }
    }
}

export function apiError(entity,event,data){
    return {
        type:`[${entity}.${event}:${API_ERROR}]`,
        payload:{
            ...data
        }
    }
}