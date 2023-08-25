import { useState } from 'react';
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { useDispatch } from 'react-redux';
import { decodeHTMLEntities } from '@news-parser/helpers/index'
import { ResponseType } from '@news-parser/types';
import { Post } from 'types/post';
import { setList } from '../actions/list.actions';
import { MessageFormat } from 'types/message';

namespace useFetchPostsList {
    export type isFetching = boolean;
    export type PostListResponseType = ResponseType<Post[]>
    export type FetchPostsList = (url: string) => Promise<PostListResponseType>;
    export type UseFetchPostsList = () => [isFetching, FetchPostsList]
}

/**
*
* Custom hook for fetching posts list.
* 
* @returns {Array} Returns an array with two elements:
* isFetching: A boolean indicating whether the fetch is in progress.
* fetchPostsList: A function for initiating the fetch.
*/

export const useFetchPostsList: useFetchPostsList.UseFetchPostsList = () => {
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();
    const fetchPostsList: useFetchPostsList.FetchPostsList = (url) => {
        const options: requestApi.RequestApiOptions = { entity: configConstantsEntities.PARSER_RSS_LIST, event: cofigConstantsEvents.PARSE, data: { url } };
        const error: requestApi.RequestApiError = (errorData) => {
            const {data}=errorData;
            console.error(errorData)
            console.log(data.message.text)
            throw new Error(data.message.text);
        };
        const success: requestApi.RequestApiSuccess<useFetchPostsList.PostListResponseType> = (postData) => {
            const { data } = postData;
            const posts = data.map((post, index) => {
                post._id = index;
                post.description = decodeHTMLEntities(post.description);
                post.title = decodeHTMLEntities(post.title);
                return post;
            });
            dispatch(setList(posts));
            return new Promise(resolve => resolve(postData));
        };
        setIsFetching(true);
        return requestApi(options, success, error).finally(() => {
            setIsFetching(false);
        })
    }
    return [isFetching, fetchPostsList]
}