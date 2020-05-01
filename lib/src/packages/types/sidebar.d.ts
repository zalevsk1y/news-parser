export type Category = {
    name: string,
    parent: number,
    id?: number
}
export type Tag = {
    name: string,
    id: number
}
export type Sidebar = {
    categories: Array<Category>,
    selectedCategories: Array<number>,
    tags:Partial<{[props:string]:Tag}>,
    selectedTags: Array<number>,
    status: 'publish' | 'future' | 'draft' | 'pending' | 'private',
    publish: {
        date: false | string,
    },
    postFormat: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio',
    allowComments: boolean,
    allowPinbacks: boolean
} 