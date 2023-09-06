import { configConstantsEntities } from '@news-parser/config/constants';
import { Post,PostDraftData } from 'types/post';
import { POSTS, SELECTED, DRAFT, INSERT, SELECT, UPDATE, RESET } from '../constants';
import { createAction } from '@reduxjs/toolkit';



// [news-parser.posts.selected:toggle]
export const TOGGLE_POST_SELECT = `[${configConstantsEntities.PARSER_RSS}.${POSTS}.${SELECTED}:${SELECT}]`;
// [news-parser.posts.draft:insert]
export const INSERT_DRAFT_POST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}.${DRAFT}:${INSERT}]`;
// [news-parser.posts:create]
export const UPDATE_POST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}:${UPDATE}]`;
export const RESET_SELECTED_POST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}.${SELECTED}:${RESET}]`;

export const togglePostSelect=createAction<Post['_id']>(TOGGLE_POST_SELECT);

export const insertDraftPost=createAction<PostDraftData>(INSERT_DRAFT_POST);

export const updatePost=createAction<Post>(UPDATE_POST);

export const resetSelectedPost=createAction<void>(RESET_SELECTED_POST);
