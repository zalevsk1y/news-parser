import { Post } from "types/post";

export const POSTS='posts';
export const SELECTED='selected';
export const SELECT='select';
export const DRAFT='draft';
export const INSERT='insert';
export const UPDATE='update';
export const SET='set';
export const RESET='reset';


export const DEFAULT_POST_DATA:Post={
    title:'',
    pubDate:'',
    link:'',
    image:'',
    description:'',
    _id:-1
}