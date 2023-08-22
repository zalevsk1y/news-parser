import { configConstantsEntities } from '@news-parser/config/constants';
import { SetAction } from '@news-parser/types';
import { Post,PostDraftData } from 'types/post';
import { POSTS, SELECTED, DRAFT, INSERT, SELECT, UPDATE, RESET } from '../constants';



// [news-parser.posts.selected:toggle]
export const TOGGLE_POST_SELECT = `[${configConstantsEntities.PARSER_RSS}.${POSTS}.${SELECTED}:${SELECT}]`;
// [news-parser.posts.draft:insert]
export const INSERT_DRAFT_POST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}.${DRAFT}:${INSERT}]`;
// [news-parser.posts:create]
export const UPDATE_POST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}:${UPDATE}]`;
export const RESET_SELECTED_POST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}.${SELECTED}:${RESET}]`;

export const togglePostSelect: SetAction<Post['_id']> = (_id) => ({
        type: TOGGLE_POST_SELECT,
        payload: _id
    })
export const insertDraftPost: SetAction<PostDraftData> = (postDraftData) => ({
        type: INSERT_DRAFT_POST,
        payload: {
            ...postDraftData
        }
    })
export const updatePost: SetAction<Post> = (post) => ({
        type: UPDATE_POST,
        payload: post
    })

export const resetSelectedPost = () => ({
        type: RESET_SELECTED_POST
    })
