import { Post } from 'types/post';
import { togglePostSelect, insertDraftPost, updatePost, resetSelectedPost } from '../actions/post.actions';
import { deletePost, pushPost, setList } from '../actions/list.actions'
import { createReducer,combineReducers } from '@reduxjs/toolkit';
import { ParserRootState } from 'types/state';


type SelectPostType = ParserRootState['parse']['items']['select'];

export const selectPost = createReducer<SelectPostType>({}, builder => {
    builder
        .addCase(togglePostSelect, (state, action) => {
            if (action.payload in state) {
                const newState = { ...state };
                delete newState[action.payload];
                return newState;
            }
            return {
                ...state,
                ...{ [action.payload]: true }
            };
        })
        .addCase(resetSelectedPost, builder => ({}))
})

type DraftPostType=ParserRootState['parse']['items']['draft']; 

export const draftPost = createReducer<DraftPostType>({}, builder => {
    builder
        .addCase(insertDraftPost, (state, action) => (
            {
                ...state,
                ...{
                    [action.payload._id]: {
                        post_id: action.payload.post_id,
                        editLink: action.payload.editLink
                    }
                }
            }
        ))
})


type PostsDataType=ParserRootState['parse']['items']['data'];

export const posts = createReducer<PostsDataType>([], builder => {
    builder
        .addCase(setList, (state, action) => ([...action.payload]))
        .addCase(updatePost, (state, action) => state.map((post: Post) => post._id == action.payload._id ? action.payload : post))
        .addCase(pushPost,(state,action)=>[...state,action.payload])
        .addCase(deletePost,(state,action)=>state.filter((post)=>post._id!==action.payload))
})


export const items = combineReducers({ data: posts, select: selectPost, draft: draftPost })