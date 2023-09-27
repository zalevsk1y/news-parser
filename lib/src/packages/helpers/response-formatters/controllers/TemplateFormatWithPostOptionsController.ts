import { TemplatePostOptions, TemplateOptions, TemplateDataWithPostOptions } from 'types/template';
import { PostData } from 'types/sidebarTemplate';
import { Sidebar } from 'types/sidebar';
import { TemplateFormatController } from './TemplateFormatController';
import { formatPostOptions } from '../formatPostOptions';
import { TemplateFormatControllerInteface } from '../types/templateFormatController'

type TemplateOptionsType = {
    extraOptions: TemplateOptions,
    postOptions: TemplatePostOptions
}

export class TemplateFormatWithPostOptionsController extends TemplateFormatController implements TemplateFormatControllerInteface<TemplateOptionsType>{
    constructor(postData: PostData, url: string, public postOptions: Sidebar, extraOptions: TemplateOptions) {
        super(postData, extraOptions, url);
    }
    /**
     * Create parsing template from selected in visual constructor blocks.
     * 
     * @returns {object} template object.
     */

    generateTemplateData() {
        const template = super.generateTemplateData() as TemplateDataWithPostOptions;
        template.postOptions = this.formatPostOptions(this.postOptions)
        return template;
    }

    formatPostOptions(postOptions: Sidebar): TemplatePostOptions {
        return formatPostOptions(postOptions)
    }
}
