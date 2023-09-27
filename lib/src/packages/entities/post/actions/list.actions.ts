import { configConstantsEntities } from '@news-parser/config/constants';
import { Post } from 'types/post';
import { POSTS, SET,PUSH,DELETE } from '../constants';
import { createAction } from '@reduxjs/toolkit';

export const SET_LIST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}:${SET}]`;
export const PUSH_POST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}:${PUSH}]`;
export const DELETE_POST=`[${configConstantsEntities.PARSER_RSS}.${POSTS}:${DELETE}]`;

export const setList=createAction<Post[]>(SET_LIST)
export const pushPost=createAction<Post>(PUSH_POST);
export const deletePost=createAction<number>(DELETE_POST)