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
type BaseElement={
    className?:string
    offsetTop:number
    parent: ParentElement[] 
}
export type ImageElement=BaseElement&{
    content?:ImageContent
    tagName:'IMG'
};
export type ImageRowGroupElement=BaseElement&{
    content:Array<ImageElement>
    tagName:'IMGROW'
};
export type InlineElement=BaseElement&{
    content?:string
    tagName:'SPAN'|'P'|'H1'|'H2'|'H3'|'IFRAME'|'DIV'
};
export type ListElement=BaseElement&{
    content?:Array<string>
    tagName:'UL'
};
export type  ParsedData=ImageElement|ImageRowGroupElement|InlineElement|ListElement;
   
export type PostData={
    image: string,
    title: false | string,
    body: Record<string, ParsedData>
}