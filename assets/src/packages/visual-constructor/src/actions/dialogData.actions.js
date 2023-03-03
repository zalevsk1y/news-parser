export const START_FETCHING=`[visual-constructor.dialogData.fetching:start]`;
export const STOP_FETCHING=`[visual-constructor.dialogData.fetching:stop]`;

export const startFetching=(entity,event,data)=>{
    return {
        type:START_FETCHING,
        payload:{
            entity,
            event,
            data
        }
    }
}
export const stopFetching=()=>{
    return {
        type:STOP_FETCHING
    }
}