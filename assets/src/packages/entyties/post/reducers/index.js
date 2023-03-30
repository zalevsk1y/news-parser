export const selectPostMeta=(state,action)=>{
    switch (action.type){
        case `[${SELECT}:${DELETE}]${POST_META}`:
            //ES9: const {[action.payload.postId],...newState}=state
            const newState={...state},
                {_id}=action.payload;
            delete newState[_id];
            return newState;
        case `[${SELECT}:${INSERT}]${POST_META}`:
            return {
                ...state,
                ...{[action.payload._id]:true}
            };
        default:
            return {...state};
    }
}
export const draftPostMeta=(state,action)=>{
    switch (action.type){
        case `[${DRAFT}:${INSERT}]${POST_META}`:
            const {_id,post_id,editLink}=action.payload;
            return {
                ...state,
                ...{[_id]:{
                   post_id,
                   editLink
                }}
            };
        default:
            return {...state}
    }
}