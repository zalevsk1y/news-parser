import { Sidebar } from "types/sidebar";
import { TemplatePostOptions } from "types/template";


export const formatPostOptions=(options:Sidebar):TemplatePostOptions=>({
        status:options.status,
        categories:options.selectedCategories,
        tags:options.selectedTags,
        comment_status:options.allowComments?'open':'close',
        ping_status:options.allowPinbacks?'open':'close',
        format:options.postFormat
    })   