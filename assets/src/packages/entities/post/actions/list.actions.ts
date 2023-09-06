import { configConstantsEntities } from '@news-parser/config/constants';
import { Post } from 'types/post';
import { POSTS, SET } from '../constants';
import { createAction } from '@reduxjs/toolkit';

export const SET_LIST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}:${SET}]`;

export const setList=createAction<Post[]>(SET_LIST)
