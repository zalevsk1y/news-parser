import { AJAX, REST, GET, POST, PUT, PATCH, DELETE } from '@news-parser/config/constants';
import { BaseClass } from '../classes/BaseClass';

export class Api extends BaseClass {
    params = null;
    fetchParams = {};
    rootUrl;
    constructor(rootUrl) {
        super();
        this.rootUrl = rootUrl;
    }
    request(url, params) {
        this.argsCheck({ url, params });
        this.params = { ...params, url };
        this.fetchParams.method = this.params.method;
        this._getHeaders()._getUrl()._getBody();
        return fetch(this.params.url, this.fetchParams);
    }
    _getUrl() {
        if (this.params.method === GET|| this.params.method == DELETE) {
            let { url, body } = this.params;
            if (body !== undefined && body !== null && typeof body === 'object') {
                //url+=Object.keys(body).map(paramName=>`&${encodeURIComponent(paramName)}=${encodeURIComponent(body[paramName])}`).join('');
                const searchParams = new URLSearchParams();
                Object.keys(body).forEach(propName => searchParams.append(propName, body[propName]));
                url += '&' + searchParams.toString();
            }
            if (this.params.type == AJAX && this.params.nonce != null) {
                url += '&_wpnonce=' + nonce;
            }
            this.params.url = url;
        }
        return this;
    }
    _getBody() {
        if (this.params.method == POST || this.params.method == PUT || this.params.method == PATCH ) {
            let { body, nonce } = this.params;
            if (this.params.type == AJAX) {
                body = body !== undefined ? { ...body, _wpnonce: nonce } : { _wpnonce: nonce };
            }
            this.fetchParams.body = JSON.stringify(body);
        }
        return this;
    }
    _getHeaders() {
        const headers = {},
            { nonce, type, method } = this.params;
        if (type === REST) {
            nonce !== null && (headers['X-WP-Nonce'] = nonce);
            headers['Access-Control-Allow-Origin'] = this.rootUrl !== undefined ? this.rootUrl : '*';
        }
        if (method === POST) {
            headers['Content-Type'] = 'application/json';
            headers['accept'] = 'application/json';
        }
        this.fetchParams.headers = headers;
        return this;
    }

}

