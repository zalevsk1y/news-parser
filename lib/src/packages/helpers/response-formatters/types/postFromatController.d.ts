import {TemplateOptions} from 'types/template'

export type WPPostData=TemplateOptions&
{
    title:string|false,
    content:string,
}

export interface PostFormatControllerInterface{
    generateWpPostData():WPPostData
}