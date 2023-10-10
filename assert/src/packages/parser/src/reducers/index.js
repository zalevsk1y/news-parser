import {combineReducers} from 'redux';
import {types} from '../actions';
import {initialStateParse,initialStateRoute} from './initState';
import {combineSubReducers} from '@news-parser/helpers';
import {dialog} from './galleryDialog'

export function parse (state=initialStateParse,action){

    switch(action.type){
        case types.REQUEST_POSTS_LIST:
            return {...state,isFetching:true,url:action.url,action:'list'};
        case types.REQUEST_SINGLE_POST:
            const actionParams=action.id?{postID:action.id}:false;
            return {...state,isFetching:true,url:action.url,action:'post',actionParams};
        case types.RECEIVE_POSTS_LIST:
            return {...state,
                isFetching:false,
                url:action.url,
                error:action.posts.err,
                message:action.posts.msg,
                action:'list',
                items:{
                    data:action.posts.data.map((item,index)=>{
                        item._id=parseInt(index);
                        return item;
                    }),
                }
            };
        case types.RECEIVE_SINGLE_POST:
            if(action.post.data._id){
                state.items.data[action.post.data._id].status=action.post.data.status;
                state.items.data[action.post.data._id].postId=action.post.data.post_id;
                state.items.data[action.post.data._id].editLink=action.post.data.link;
            }
            return {...state,
                isFetching:false,
                url:action.url,
                action:'post',
                message:action.post.msg,
                error:action.post.err
            };
        case types.OPEN_DIALOG:
            return {...state,
                isFetching:false,
                url:action.url,
                action:'dialog',
                message:action.data.msg,
                error:action.data.err,
                dialog:action.data.dialog
            };
        case types.CLOSE_DIALOG:
            return {...state,
                 action:'main',
                 dialog:false
            }
        case types.FETCH_ERROR:
            return {
                ...state,
                isFetching:false,
                url:false,
                action:'main',
                message:action.data.msg,
                error:action.data.err,
                actionParams:false
            }
        case types.RECEIVE_ERROR:
            return{...state,
                isFetching:false,
                url:false,
                action:'main',
                message:action.data.msg,
                error:action.data.err,
                actionParams:false
            }
        case types.CREATE_MESSAGE:
            return{...state,
                message:action.msg}
        default: 
            return {...state}
    }
}

export function route(state=initialStateRoute,action){
 
    if(action.type===types.SET_ROUTE){
        return {...state,action:action.action,url:action.url}
    }else{
        return {...state}
    }
}

export default combineReducers({parse:combineSubReducers(parse,'dialog',dialog),route});