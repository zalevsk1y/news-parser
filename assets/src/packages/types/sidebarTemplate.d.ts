export type ImageContent={
    src:string,
    srcSet:string,
    sizes:string,
    alt:string
}
export type ParentElement={
    className:string,
    tagName:string
}
export type  ParsedData={
    content?:string|ImageContent|string[]|undefined
    tagName:string
    className?:string
    offsetTop:number
    parent: ParentElement[] 
}

export interface ParsedImageData extends ParsedData{
    content:ImageContent;
}

export interface ParsedListData extends ParsedData{
    content:string[];
}

export interface ParsedTextData extends ParsedData{
    content:string;
}

export type PostData={
    image: string,
    title: false | string,
    body: Record<string, ParsedData>
}