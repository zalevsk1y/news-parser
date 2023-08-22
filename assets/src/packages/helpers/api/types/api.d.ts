export type RequestParams={
        type:string,
        method:string,
        nonce:string|null,
        body?: any,
        headers?:HeadersInit |undefined,
        url?:string
}
export interface ApiInterface{
    request<ResponseType>(url:string,params:RequestParams):Promise<Response>
}