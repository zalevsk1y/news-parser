import { TemplateContainer } from "@news-parser/helpers/response-formatters/types/templateModel";
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
    addFeaturedMedia: boolean,
    addSource: boolean,
    saveParsingTemplate: boolean
}
export type TemplateDataWithPostOptions=TemplateData&{
    postOptions:TemplatePostOptions
}
export type TemplatePostOptions={
        post_status:Sidebar['status'],
        post_category:Sidebar['selectedCategories'],
        tags_input:Sidebar['selectedTags'],
        comment_status:Sidebar['allowComments'],
        ping_status:Sidebar['allowPinbacks'],
        format:Sidebar['postFormat']
}

