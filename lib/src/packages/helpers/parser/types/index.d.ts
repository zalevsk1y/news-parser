import { ImageContent, ParsedData, ParentElement } from "types/sidebarTemplate"
import {ImageRowGroupElement} from 'types/sidebarTemplate'

export type ParsedElementData = {
    hash: string,
    content: Exclude<ParsedData,ImageRowGroupElement>
}

export interface ParserInterface {
    parseElementData(el: HTMLElement): ParsedElementData
    getOffsetTop(el: HTMLElement): number
    parseImageContent(el: HTMLImageElement): ImageContent
    parseListContent(el: HTMLUListElement): string[]
    getParentsArray(el: HTMLElement): ParentElement[]
}

export interface PostTitleParserInterface {
    findTitle(): false | string
}

export interface FeaturedImageParserInterface{
    findFeaturedImage():false|string
}
export interface ImageParserInterface{
    replaceImageSrc(isLazy:boolean):void
}