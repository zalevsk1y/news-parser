export const SHOW_MESSAGE='[MESSAGE:SHOW]';

export const showMessage=(type,text)=>{
    return {
        type:SHOW_MESSAGE,
        payload:{
            type,
            text
        }
    }
}