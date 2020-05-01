import config from '@news-parser/config/index';
import { Api } from './Api';
import { Message } from 'types/message';


export type RequestApiOptions = {
        entity: string,
        event: string,
        data: any,
        searchParams?: undefined | any
}
export type ErrorResponse = {
        code: string,
        message: string,
        data: {
            message:Message
        }
};
export type RequestApiSuccess<ResponseType> = (data: ResponseType) => Promise<ResponseType>;
export type RequestApiError = (err:ErrorResponse) => never;


/**
 * Function for making an API request.
 *
 * @template ResponseType - The expected response type.
 * @param {RequestApiOptions} options - The request options.
 * @param {RequestApiSuccess<ResponseType>} success - The success callback function.
 * @param {RequestApiError} error - The error callback function.
 * @returns {Promise<ResponseType>} A promise that resolves to the API response.
 */

export const requestApi = <ResponseType>(options: RequestApiOptions, success: RequestApiSuccess<ResponseType>, error: RequestApiError,controller?:AbortController) => {
    const { entity, event, data, searchParams } = options;
    const {method} = config.api[entity][event];
    const {type} = config.api[entity][event];
    const {nonce} = config.api[entity][event];
    let {url} = config.api[entity][event];
    if (searchParams !== undefined) {
        const urlSearchParams = new URLSearchParams();
        for (const paramName in searchParams) {
            urlSearchParams.append(paramName, searchParams[paramName])
        }
        url +='&'+ urlSearchParams.toString();
    }
    const api = new Api(url,{
        type,
        method,
        nonce,
        body: data
    },
    controller
    );
    return api.request() 
        .then(res => {
            if (!res.ok) {
                return res.json().then((err) => error(err))
            }
            switch (res.headers.get('Content-Type')) {
                case 'application/json; charset=UTF-8':
                case 'application/json':
                    return res.json();
                default:
                    return res.text();
            }
        })
        .then((data: ResponseType) => success(data))
}
