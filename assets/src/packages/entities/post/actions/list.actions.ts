import { configConstantsEntities } from '@news-parser/config/constants';
import { SetAction } from '@news-parser/types';
import { Post } from 'types/post';
import { POSTS, SET } from '../constants';

export const SET_LIST = `[${configConstantsEntities.PARSER_RSS}.${POSTS}:${SET}]`;


export const setList: SetAction<Post[]> = (data) => ({
        type: SET_LIST,
        payload: data
    })