import { SUBMIT,LIST,URL } from "../constants";

export const parseURL=(url)=>{
    return {
        type:`${SUBMIT}:${URL}`,
        payload:{
            url
        }
    }
}
export const parseList=(url)=>{
    return {
        type:`${SUBMIT}:${LIST}`,
        payload:{
            url
        }
    }
}