export const API_REQUEST='API_REQUEST';
export const API_SUCCESS='API_SUCCESS';
export const API_ERROR='API_ERROR';
export const START_FETCHING='START_FETCHING';
export const STOP_FETCHING='STOP_FETCHING';

export function apiRequest(entity,event,data){
    return {
        type:`[${entity}:${event}]${API_REQUEST}`,
        payload:{
            entity,
            event,
            data
        }
    }
}

export function apiSuccess(entity,event,data){
    return {
        type:`[${entity}:${event}]${API_SUCCESS}`,
        payload:{
            ...data
        }
    }
}

export function startFetching(entity,method,data){
    return {
        type:START_FETCHING,
        payload:{
            entity,
            method,
            data
        }
    }
}
export function stopFetching(){
    return{
        type:STOP_FETCHING
    }
}

export function apiError(){
    return {
        type: API_ERROR
    }
}