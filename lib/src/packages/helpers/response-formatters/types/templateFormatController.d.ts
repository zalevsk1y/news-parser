import { TemplateData } from "types/template"

export interface TemplateFormatControllerInteface<OptionsType>{
    generateTemplateData():TemplateData&OptionsType
}


export type TemplateContainerChild={
    tagName:string,
    // php-simple-html-dom-parser https://github.com/sunra/php-simple-html-dom-parser search string
    searchTemplate:string,
    position?:string
}
export type TemplateContainer=TemplateContainerChild&{
    className:string,
    children:TemplateContainerChild[]
}
