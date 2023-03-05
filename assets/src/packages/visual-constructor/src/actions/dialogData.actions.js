
export const START_FETCHING=`[visual-constructor.dialogData.fetching:start]`;
export const STOP_FETCHING=`[visual-constructor.dialogData.fetching:stop]`;

export const CLOSE_DIALOG='[visual-constructor.dialogData.isOpen:close]';
export const OPEN_DIALOG='[visual-constructor.dialogData.isOpen:open]';
export const FRAME_IS_READY='[visual-constructor.dialogData.frameIsReady:ready]';


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

export const openDialog=(url,_id)=>{
    return {
        type:OPEN_DIALOG,
        payload:{
            url,
            _id
        }
    }
}

export const closeDialog=()=>{
    return {
        type:CLOSE_DIALOG
    }
}

export const frameIsReady=()=>{
    return {
        type:FRAME_IS_READY
    }
}