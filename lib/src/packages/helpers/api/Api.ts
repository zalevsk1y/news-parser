import { configConstantsMethods, cofigConstantsEvents } from '@news-parser/config/constants';
import { ApiInterface , RequestParams } from './types/api';

/**
 * Class representing an API client.
 * @implements {ApiInterface}
 */

export class Api implements ApiInterface {
  
    /**
   * Root URL of the API.
   *
   * @type {string}
   * @protected
   */
    protected fetchParams:RequestInit

    constructor(protected url: string, protected params: RequestParams) { 
        this.fetchParams=this.getFetchParams();
    }
    /**
 * Method for sending a request to the API.
 *
 * @template ResponseType - The expected response type.
 * @param {string} url - The URL to send the request to.
 * @param {RequestParams} params - The request parameters.
 * @returns {Promise<Response>} A promise that resolves to the API response.
 * @public
 */

    public request(): Promise<Response> {
        
        const fetchUrl: string = this.params.url || this.url;
        return fetch(fetchUrl, this.fetchParams);
    }
    /**
   * Method for constructing the URL based on the request method and parameters.
   *
   * @returns {Api} The current instance of the API.
   * @protected
   */

    protected getUrl() {
        if (this.params.method === configConstantsMethods.GET || this.params.method == configConstantsMethods.DELETE) {
            const { body, nonce } = this.params;
            let url = this.url;
            if (body !== undefined && body !== null && typeof body === 'object') {
                const searchParams = new URLSearchParams();
                Object.keys(body).forEach(propName => searchParams.append(propName, body[propName]));
                url +='&'+ searchParams.toString();
            }
            if (this.params.type == cofigConstantsEvents.AJAX && this.params.nonce != null) {
                url += `&_wpnonce=${  nonce}`;
            }
            return url;
        }
        return this.url;
    }
    /**
   * Method for constructing the request body based on the request method and parameters.
   *
   * @returns {Api} The current instance of the API.
   * @protected
   */

    getBody() {
        if (this.params.method == configConstantsMethods.POST || this.params.method == configConstantsMethods.PUT || this.params.method == configConstantsMethods.PATCH) {
            let { body } = this.params;
            const { nonce } = this.params;
            if (this.params.type == cofigConstantsEvents.AJAX) {
                body = body !== undefined ? { ...body, _wpnonce: nonce } : { _wpnonce: nonce };
            }
            return JSON.stringify(body);
        }
        return false;
    }
    /**
   * Method for constructing the request headers based on the request method and parameters.
   *
   * @returns {Api} The current instance of the API.
   * @protected
   */

    getHeaders() {
        const headers = new Headers();
            const { nonce, type, method } = this.params;
        if (type === cofigConstantsEvents.REST) {
            if (nonce !== null) headers.append('X-WP-Nonce',nonce);
            headers.append('Access-Control-Allow-Origin', this.url !== undefined ? this.url : '*');
        }
        if (method === configConstantsMethods.POST) {
            headers.append('Content-Type', 'application/json');
            headers.append('accept','application/json');
        }
        return headers;
    }
    protected getFetchParams(){
        const fetchParams:RequestInit ={
            method:this.params.method,
            credentials: 'include'
        };
        const requestBody=this.getBody();
        if(requestBody!==false) fetchParams.body=requestBody;
        fetchParams.headers=this.getHeaders();
        this.url=this.getUrl();
        return fetchParams;
    }

}

