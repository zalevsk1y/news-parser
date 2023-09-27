import { PostData } from 'types/sidebarTemplate';
import { TemplateOptions, TemplatePostOptions } from 'types/template';
import { PostFormatController } from './controllers/PostFormatController';
import { adapterGuttenberg } from './adapters/AdapterGuttenberg';
import { groupImagesInRows } from './modifiers/before/groupImagesInRows'
import { addSourceLink } from './modifiers/after/addSourceLink';
import { generateImageSizesBreakpoints } from './modifiers/before/generateImageSizesBreakpoints';
import {removeSrcSetAndSizeAttr} from './modifiers/before/removeSrcSetAndSizeAttr';

/**
 * Formats the create post draft request by creating an instance of the PostController class and applying modifiers to modify the parsed data according to the set template options.
 *
 * @param {object} postData - The post data to be formatted.
 * @param {object} options - The template options for formatting the post data.
 * @param {string} url - The URL for the post.
 * @returns {string} - The formatted post data.
 */


export const formatCreatePostDraftRequest = (postData: PostData, options: Partial<TemplatePostOptions> & TemplateOptions, url: string) => {
    const postController = new PostFormatController(postData, options, url, adapterGuttenberg);
    if (options.addSrcSetAndSizes) {
        postController.addContentModiersBeforConversion(generateImageSizesBreakpoints)
    }else{
        postController.addContentModiersBeforConversion(removeSrcSetAndSizeAttr)
    }
    if (options.groupImagesRow) {
        postController.addContentModiersBeforConversion(groupImagesInRows)
    }
    if (options.addSource) {
        postController.addContentModiersAfterConversion(addSourceLink(url))
    }
    return postController.generateWpPostData();
};