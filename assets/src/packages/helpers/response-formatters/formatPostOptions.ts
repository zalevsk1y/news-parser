import { Sidebar } from "types/sidebar";
import { TemplatePostOptions } from "types/template";


export const formatPostOptions=(options:Sidebar):TemplatePostOptions=>({
        post_status:options.status,
        post_category:options.selectedCategories,
        tags_input:options.selectedTags,
        comment_status:options.allowComments,
        ping_status:options.allowPinbacks,
        format:options.postFormat
    })   