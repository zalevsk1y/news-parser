import { Sidebar } from "types/sidebar";
import { TemplateOptions } from "types/template";
import { PostData } from "types/sidebarTemplate";
import { TemplateFormatWithPostOptionsController } from "./controllers/TemplateFormatWithPostOptionsController";

export const formatCreateTemplateWithOptionsRequest = (postData: PostData, url: string, postOptions: Sidebar, extraOptions: TemplateOptions) => (new TemplateFormatWithPostOptionsController(postData, url, postOptions, extraOptions)).generateTemplateData();