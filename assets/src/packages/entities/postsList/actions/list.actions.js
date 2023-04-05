export const FETCH_LIST='FETCH_LIST';
export const SET_LIST='SET_LIST';

// use instead requestPostsList
export const fetchList=(url)=>{
    return {
        type:FETCH_LIST,
        payload:{
            url
        }
    }
}

export const setList=(data)=>{
    return{ 
        type:SET_LIST,
        payload:{
            data
        }
    }
}