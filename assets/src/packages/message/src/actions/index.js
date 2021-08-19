export const SHOW_MESSAGE='SHOW_MESSAGE';

export const showMessage=(type,text)=>{
    return {
        type:SHOW_MESSAGE,
        payload:{
            type,
            text
        }
    }
}