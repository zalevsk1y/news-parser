

export type WPPostData={
    title:string|false,
    content:string,
    addFeaturedMedia: boolean;
    addSource: boolean;
    saveParsingTemplate: boolean;
}

export interface PostModelInterface{
    generateWpPostData():WPPostData
}