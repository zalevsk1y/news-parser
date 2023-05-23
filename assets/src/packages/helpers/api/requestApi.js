import { Api } from './Api';
import config from '@news-parser/config';


export const requestApi = (options, success, error) => {
    const { entity, event, data, searchParams } = options;
    const method = config.api[entity][event].method;
    const type = config.api[entity][event].type;
    const nonce = config.api[entity][event].nonce;
    const api = new Api(config.rootUrl);
    let url = config.api[entity][event].url;
    if (searchParams !== undefined) {
        const urlSearchParams = new URLSearchParams('');
        for (const paramName in searchParams) {
            urlSearchParams.append(paramName, searchParams[paramName])
        }
        url += '&' + urlSearchParams.toString();
    }
    return api.request(url, {
        type,
        method,
        nonce,
        body: data
    })
        .then(res => {
            if (res.ok == false) {
                return res.text().then(data => ({ code: res.status, msg: { type: 'error', text: data } }))
            }
            switch (res.headers.get('Content-Type')) {
                case 'application/json; charset=UTF-8':
                case 'application/json':
                    return res.json();
                default:
                    return res.text();
            };
        })
        .then(data => {
            if (data.code && data.code !== 200) {
                return error(entity, event, data);
            } else {
                return success(entity, event, data);
            }
        })
}