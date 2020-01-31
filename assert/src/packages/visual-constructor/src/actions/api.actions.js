export const DIALOG_FETCHING='DIALOG_FETCHING';

export const dialogFetching=(status)=>{
    return {
        type:DIALOG_FETCHING,
        payload:{
            status
        }
    } 
}