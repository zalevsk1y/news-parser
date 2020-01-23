import {types} from '../index';
import {
    requestPostsList,
    requestPost,
    receivePostsList,
    receivePost,
    receiveError,
    setRoute,
    parseRSSList,
    parsePage
} from '../index';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import config from '@news-parser/config'

describe('actions', () => {
    it('should create action to load posts list from rss', () => {
        const url = 'www.test.com/rss',
            expectedAction = {
                type: types.REQUEST_POSTS_LIST,
                url
            }
        expect(requestPostsList(url)).toEqual(expectedAction);
    });
    it('should create action to load single post', () => {
        const url = 'www.test.com/post.html',
            expectedAction = {
                type: types.REQUEST_SINGLE_POST,
                url
            };
        expect(requestPost(url)).toEqual(expectedAction);
    })
    it('should create action to receive posts from server', () => {
        const url = 'www.test.com/rss',
            posts = {
                1: 'post1',
                2: 'post2'
            },
            expectedAction = {
                type: types.RECEIVE_POSTS_LIST,
                url,
                posts,
                date: false
            };
        expect(receivePostsList(url, posts)).toEqual(expectedAction)
    })
    it('should create action to receive status of parsing single post from server', () => {
        const url = 'www.test.com/rss',
            post = {
                data: 'post'
            },
            expectedAction = {
                type: types.RECEIVE_SINGLE_POST,
                url,
                post,
                date: false
            };
        expect(receivePost(url, post)).toEqual(expectedAction)
    })
    it('should create action when error received from server', () => {
        const url = 'www.test.com/rss',
            data = {
                status: 'error'
            },
            expectedAction = {
                type: types.RECEIVE_ERROR,
                url,
                data
            };
        expect(receiveError(url, data)).toEqual(expectedAction)
    })
    it('should create action to set new route', () => {
        const params = {
                action: 'list',
                url: 'www.test.com/rss'
            },
            expectedAction = {
                type: types.SET_ROUTE,
                action: params.action,
                url: params.url
            };
        expect(setRoute(params)).toEqual(expectedAction)
    })

    /**
     * test async fetch actions
     */

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    it('should create action RECEIVE_POSTS_LIST when fetching posts has been done', () => {
        const body = {
            "err": 0,
            "msg": {
                type: 'success',
                text: 'test message'
            },
            "data": []
        };
        const url='www.test.com/rss';
        const nonce='testNonce';
        fetchMock.once(config.parsingApi.list+encodeURIComponent(url)+'&_wpnonce='+nonce, {
            body,
            headers: {
                "content-type": "application/json"
            }
        });
        const expectedActions = [
                {
                    type: types.REQUEST_POSTS_LIST,
                    url
                }, {
                    type: types.RECEIVE_POSTS_LIST,
                    url,
                    posts: body,
                    date: false
                }
            ];
        const store = mockStore({posts: []});
        store
            .dispatch(parseRSSList(store.dispatch,nonce, url))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })

    })
    it('should create RECEIVE_SINGLE_POST action when post data has been received', () => {
        const id=10;
        const body = {
            err: 0,
            msg: {
                type: 'success',
                text: 'ok'
            },
            data: {
                _id:id,
                status: 'draft',
                postId: 1,
                link: 'http://localhost:3000/test-edit/'
            }
        };
        const url='www.test.com/post.html';
        const nonce='testNonce';
        fetchMock.once(config.parsingApi.single + encodeURIComponent(url)+'&_wpnonce='+nonce,{
            body,
            headers:{"content-type": "application/json"}
        });
        const expectedActions=[
            {
                type:types.REQUEST_SINGLE_POST,
                url,
                id
            },
            {
                type:types.RECEIVE_SINGLE_POST,
                url,
                post:body,
                date:false
            }
        ]
        const store=mockStore({posts:[]});
        store.dispatch(parsePage({dispatch:store.dispatch,nonce,url,id})).then(()=>{
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
        it('should create OPEN_DIALOG action when dialog data has been received', () => {
            const id=10;
            const body = {
                err: 0,
                msg: false,
                dialog: {
                   type:'gallery',
                   data:[]
                }
            };
            const url='www.test.com/post.html';
            const nonce='testNonce1';
            fetchMock.once(config.parsingApi.single + encodeURIComponent(url)+'&_wpnonce='+nonce,{
                body,
                headers:{"content-type": "application/json"}
            });
            const expectedActions=[
                {
                    type:types.REQUEST_SINGLE_POST,
                    url,
                    id
                },
                {
                    type:types.OPEN_DIALOG,
                    url,
                    data:body
                }
            ]
            const store=mockStore({posts:[]});
            store.dispatch(parsePage({dispatch:store.dispatch,nonce,url,id})).then(()=>{
                expect(store.getActions()).toEqual(expectedActions)
            })
         })
        
})