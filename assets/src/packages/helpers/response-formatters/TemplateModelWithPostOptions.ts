import { TemplatePostOptions,TemplateOptions, TemplateDataWithPostOptions } from 'types/template';
import { ParsedData , PostData } from 'types/sidebarTemplate';
import { Sidebar } from 'types/sidebar';
import { TemplateModel } from './TemplateModel';
import {formatPostOptions} from './formatPostOptions';
import {TemplateModelWithPostOptionsInterface} from './types/templateModel'

export class TemplateModelWithPostOptions extends TemplateModel implements TemplateModelWithPostOptionsInterface {
    constructor (postData:PostData, url:string,public postOptions:Sidebar,extraOptions:TemplateOptions){
        super(postData,extraOptions,url);
    }
    /**
     * Create parsing template from selected in visual constructor blocks.
     * 
     * @returns {object} template object.
     */

    createTemplateData():TemplateDataWithPostOptions {
        const arrayOfElements:ParsedData[] = Object.keys(this.postData.body).map(propName => this.postData.body[propName]);
            const cleanedData = this.removeDuplicate(arrayOfElements);
            const sortedData = this.sortByDOMPosition(cleanedData);
            const container = this.createContainer(sortedData);
        const template = {
            url: this.url,
            postOptions: this.formatPostOptions(this.postOptions),
            extraOptions:this.options,
            template: container
        };
        if(container===undefined) return template
        sortedData.forEach(item => {
            const tagName = item.tagName.toLowerCase();
                const searchTemplate = this.createSearchTemplate(item, container.className);
            container.children.push({
                tagName,
                searchTemplate,
                position: 'all'
            })
        })
        return template;
    }

    formatPostOptions(postOptions:Sidebar):TemplatePostOptions {
        return formatPostOptions(postOptions)
    }
}

export const formatCreateTemplateRequest = (postData:PostData, url:string, postOptions:Sidebar,extraOptions:TemplateOptions) => (new TemplateModelWithPostOptions(postData, url, postOptions,extraOptions)).createTemplateData();