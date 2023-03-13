import { useState, useEffect } from "react";
import { Api } from '@news-parser/helpers/api/Api';
import config from '@news-parser/config';


export const useRequestApi = (options, success, error) => {
    
    const { entity, event, data } = options,
        method = config.api[entity][event].method,
        type = config.api[entity][event].type,
        nonce = config.api[entity][event].nonce,
        url = config.api[entity][event].url,
        api = new Api(config.rootUrl);
    return api.request(url, {
        type,
        method,
        nonce,
        body: data
    })
        .then(res => {
            if(res.ok==false){
                return res.text().then(data=>({code: res.status,msg:{type:'error',text:data}}))
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
                error(entity, event, data);
            } else {
                success(entity, event, data);
            }
        })
}