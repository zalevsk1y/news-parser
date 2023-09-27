import { Message } from "./message"

export type SetAction<T> = (payload: T) => {
    type: string,
    payload: T
}

export type Action = { type: string, payload: any }

export type ResponseType<ResponseData> = {
    data: ResponseData,
    msg: Message
}

