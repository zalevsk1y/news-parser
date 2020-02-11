import {PAGE,PARSE,SELECT,DELETE,DRAFT,INSERT} from '../../constants';
import {apiRequest,API_SUCCESS, API_REQUEST} from '../../actions/api.actions';
import {setPostMeta} from '../../actions/post.actions';
import {table} from '@news-parser/helpers/classes/Table'
import { showMessage } from '@news-parser/message/actions/';

export const pageMiddleware = (store)=>next=>action=>{
    next (action);
    const {dispatch,getState}=store;
    switch(action.type){
        case `[${PAGE}:${PARSE}]${API_REQUEST}`:
            const {data,select}=getState().parse.items,
                    selected=Object.keys(select);
                if(selected.length===0){
                    dispatch(showMessage('info','Please select posts.'));
                }else{
                    const posts=table(data).join({select}),
                        selectedPosts=posts.filter(post=>post.select),
                        requestParams={};
                    var requestPromise;
                    for(var i=0,end=selectedPosts.length;i<end;i++){
                        requestParams.url=selectedPosts[i].link;
                        requestParams._id=selectedPosts[i]._id;
                        if(i===0) requestPromise=dispatch(apiRequest(PAGE,PARSE,requestParams));
                        if(i>0) requestPromise.then(()=>dispatch(apiRequest(PAGE,PARSE,requestParams)));
                    }
                }
                break;
        case `[${PAGE}:${PARSE}]${API_SUCCESS}`:
            const {post_id,_id,editLink}=action.payload.data,
                {msg}=action.payload
            dispatch(setPostMeta(SELECT,DELETE,_id));
            dispatch(setPostMeta(DRAFT,INSERT,_id,{post_id,editLink}));
            dispatch(showMessage(msg.type,msg.text));
            break;
    }
}