
export const POST_META='POST_META';
export const TOGGLE_SELECT_POST='TOGGLE_SELECT_POST';
export const PARSE_SELECTED_POSTS='PARSE_SELECTED_POSTS';

export const togglePostSelect=(_id)=>{
    return {
        type:TOGGLE_SELECT_POST,
        payload:{
            _id
        }
    }
}
export const setPostMeta=(metaData,event,_id,data)=>{
    console.log(_id)
    return {
        type:`[${metaData}:${event}]${POST_META}`,
        payload:{
            _id,
            ...data
        }
    }
}


