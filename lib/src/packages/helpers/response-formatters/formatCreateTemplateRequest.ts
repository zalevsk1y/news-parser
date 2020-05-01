import { TemplateFormatController } from "./controllers/TemplateFormatController";
import { PostData } from "types/sidebarTemplate";
import { TemplateOptions } from "types/template";

/** 
 * Create parsing template from selected in visual constructor blocks.
 * 
 * @param {object} postData 
 * @param {object} options 
 * @param {string} url 
 * @returns {object} template object.
 */

export const formatCreateTemplateRequest = (postData:PostData,options:TemplateOptions,url:string) => (new TemplateFormatController(postData, options, url)).generateTemplateData();