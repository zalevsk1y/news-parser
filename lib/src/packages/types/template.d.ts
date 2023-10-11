import { TemplateContainer } from "@news-parser/helpers/response-formatters/types/templateFormatController";
import { PostData } from "./sidebarTemplate"
import { Sidebar } from "./sidebar";

export type TemplateData={
    url:string,
    extraOptions:TemplateOptions;
    template:TemplateContainer|undefined
}

export type SidebarTemplate={
    parsedData:PostData;
    options:TemplateOptions
}

export type TemplateOptions={
    addSrcSetAndSizes?:boolean,
    groupImagesRow?:boolean,
    addFeaturedMedia: boolean,
    addSource: boolean,
    saveParsingTemplate?: boolean
}
export type TemplateDataWithPostOptions=TemplateData&{
    postOptions:TemplatePostOptions
}
export type TemplatePostOptions={
        status:Sidebar['status'],
        categories:Sidebar['selectedCategories'],
        tags:Sidebar['selectedTags'],
        comment_status:'open'|'close',
        ping_status:'open'|'close',
        format:Sidebar['postFormat']
}

