export const SET_ROUTE='SET_ROUTE'
export function setRoute(page) {
    return {
        type: SET_ROUTE,
        payload:{
            page
        }
    }
}