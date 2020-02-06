import {SINGLE,CREATE,ADD} from '../../constants/index';
import {apiRequest} from '../../../actions/api.actions';
import {showMessage} from '../../../actions/';
import {postDraft} from '../../../actions/post.actions';

export const multiMiddleware = (store)=>next=>action=>{
    next (action);
    const {dispatch,getState}=store;
    switch(action.type){
        case `[${MULTI}:${PARSE}]${POST_ITEM}`:
            const {data}=action.payload;
            dispatch(apiRequest(MULTI,PARSE,data));
            break;
        case `[${MULTI}:${PARSE}]${API_SUCCESS}`:
            const {_id,title,image,options}=getState().fetchData.data,
                {data}=action.payload,
                post_id=data.id;
            options.addFeaturedImage&&dispatch(createFeaturedImage(image,title,post_id));
            dispatch(setPostMeta(DRAFT,ADD,_id,{post_id,editLink}));
            dispatch(showMessage('success',data.msg.text));
    }
}