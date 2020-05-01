export type Post = {
    title: string,
    pubDate: string,
    link: string,
    image: string,
    description: string,
    _id: number,
    post_id?: number,
    select?:boolean,
    draft?:{
        post_id:number,
        editLink:string
    }
}
export type WPPost = {
    id: number,
    [otherProps: string]: any
}

export type PostDraftData = {
    _id: number,
    post_id: number,
    editLink: string
}

export type MediaData = {
    url: string,
    options: {
        alt: string,
        post_id: number
    }
}
export type WpMedia = {

}