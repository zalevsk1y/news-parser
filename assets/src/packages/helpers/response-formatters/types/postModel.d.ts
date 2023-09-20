import {TemplateOptions} from 'types/template'

export type WPPostData=TemplateOptions&
{
    title:string|false,
    content:string,
}

export interface PostModelInterface{
    generateWpPostData():WPPostData
}