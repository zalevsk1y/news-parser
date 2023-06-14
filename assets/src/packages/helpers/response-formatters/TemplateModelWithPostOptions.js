import { TemplateModel } from "./TemplateModel";
import {formatPostOptions} from '../response-formatters/formatPostOptions'

export class TemplateModelWithPostOptions extends TemplateModel {
    /**
     * Create parsing template from selected in visual constructor blocks.
     * 
     * @param {object} postData 
     * @param {object} url 
     * @param {string} extraOptions
     * @param {string} postOptions 
     * @returns {object} template object.
     */

    create(postData, url, postOptions,extraOptions) {
        const argsError = this.argsCheck({ postData, url, extraOptions, postOptions });
        if (argsError instanceof Error) throw argsError;
        const arrayOfElements = Object.keys(postData.body).map(propName => {
            return postData.body[propName]
        }),
            cleanedData = this.removeDuplicate(arrayOfElements),
            sortedData = this.sortByDOMPosition(cleanedData),
            container = this.createContainer(sortedData);
        const template = {
            url: url,
            postOptions: this.formatPostOptions(postOptions),
            extraOptions,
            template: container
        };
        sortedData.forEach(item => {
            const tagName = item.tagName.toLowerCase(),
                searchTemplate = this.createSearchTemplate(item, container.className);
            container.children.push({
                tagName,
                searchTemplate,
                position: 'all'
            })
        })
        return template;
    }
    argsCheck(argsObj) {
        //ToDo:implement agrument check
        return true
    }
    formatPostOptions(postOptions) {
        return formatPostOptions(postOptions)
    }
}

export const formatCreateTemplateRequest = (postData, url, postOptions,extraOptions) => (new TemplateModelWithPostOptions()).create(postData, url, postOptions,extraOptions);