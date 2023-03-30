import {types} from '../../actions';
import reducers from '../index';

import {initialStateParse,initialStateRoute} from '../initState';
import {mockPostsData,mockPostData,mockReceiveError,mockDialogData} from './mockData'

describe ('reducers',()=>{
    it('should return initial state of parse reducer',()=>{
        expect(reducers(undefined,{}).parse).toEqual(initialStateParse)
    });
    it ('should handle REQUEST_POSTS_LIST',()=>{
        const action={
            type:types.REQUEST_POSTS_LIST,
            url:'test.com/rss'
        }
        expect(reducers({},action).parse).toEqual(
            {...initialStateParse,
                isFetching:true,
                url:action.url,
                action:'list'
            }
        )
    })
    it('should handle REQUEST_SINGLE_POST',()=>{
        const action={
            type:types.REQUEST_SINGLE_POST,
            url:'test.com/post.html'
        }
        expect(reducers({},action).parse).toEqual(
            {...initialStateParse,
                isFetching:true,
                url:action.url,
                action:'post'
            }
        )
    })
    it('should handle RECEIVE_POSTS_LIST',()=>{
        const action={
            type:types.RECEIVE_POSTS_LIST,
            url:'test.com/rss',
            posts:mockPostsData,
            date:false
        }
        expect(reducers({},action).parse).toEqual(
            {...initialStateParse,
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
                }}
        )
    })
    it('should handle RECEIVE_SINGLE_POST',()=>{
        const action={
            type:types.RECEIVE_SINGLE_POST,
            url:'test.com/post.html',
            post:mockPostData,
            date:false
        }
        
        expect(reducers({},action).parse).toEqual(
            {...initialStateParse,
                isFetching:false,
                url:action.url,
                action:'post',
                message:action.post.msg,
                error:action.post.err}
        )
    })
    it('should handle OPEN_DIALOG',()=>{
        const action={
            type:types.OPEN_DIALOG,
            url:'test.com/post.html',
            data:mockDialogData
        }
       
        expect(reducers({},action).parse).toEqual(
            {...initialStateParse,
                isFetching:false,
                url:action.url,
                action:'dialog',
                message:action.data.msg,
                error:action.data.err,
                dialog:action.data.dialog
            }
        )
    })
    it('should handle RECEIVE_ERROR',()=>{
        const action={
            type:types.RECEIVE_ERROR,
            data:mockReceiveError
        }
        expect(reducers({},action).parse).toEqual(
            {...initialStateParse,
                isFetching:false,
                url:false,
                action:'main',
                message:action.data.msg,
                error:action.data.error
            }
        )
    })
    it('should return initial state of route reducer',()=>{
        expect(reducers(undefined,{}).route).toEqual(initialStateRoute)
    })
})