import ArrayExtendedMethods from '../classes/classesForExtend/ArrayExtenedMethods';
import { FeaturedImageParserInterface } from './types';
/**
 * Class finds main image of the article or post.
 * 
 * @since 1.0.2
 * 
 * @param {object} HTML document
 */
export default class FeaturedImageParser extends ArrayExtendedMethods  implements FeaturedImageParserInterface{
    constructor(protected doc: Document) {
        super();
        if (doc === undefined) throw Error('HTML document argument could not be undefined.');
    }

    /**
     * Parse main image of post or article using methods from array.
     * 
     * @extends ArrayExtendedMethods.reduceWithBreak()
     * @returns {false|string} source url of main post image.
     */
    public findFeaturedImage(): false | string {
        const arrayOfParseCallbacks = [
            this.findUsingSchema,
            this.findInArticleTag,
            this.findInMainTag
        ]
        return this.reduceWithBreak(arrayOfParseCallbacks, [this.doc]);
    }

    /**
     * Search image using schema.org markup
     * 
     * @extends ArrayExtendedMethods.forEachWithBreak()
     * @returns {false|string}
     */
    protected findUsingSchema(): false | string {
        const metaTags = this.doc.getElementsByTagName('meta');
        return this.forEachWithBreak<HTMLMetaElement, string>(Array.from(metaTags), metaTag => {
            const resultValue = metaTag.hasAttribute('property')
                && metaTag.getAttribute('property') === 'og:image'
                && metaTag.hasAttribute('content')
                && metaTag.getAttribute('content');
            return resultValue === null ? false : resultValue;
        });
    }

    /**
     * Search for image in article tag.
     * 
     *  @extends ArrayExtendedMethods.forEachWithBreak()
     *  @returns {false|string} 
     */
    protected findInArticleTag(): false | string {
        const articleImgTags = this.doc.querySelectorAll('article img');
        return this.forEachWithBreak(Array.from(articleImgTags), imgTag => {
            const resultValue = imgTag.hasAttribute('src')
                && imgTag.getAttribute('src')
            return resultValue === null ? false : resultValue;
        })
    }

    /**
     * Search for image in main tag.
     * 
     * @extends ArrayExtendedMethods.forEachWithBreak()
     * @returns {false|string} 
     */
    protected findInMainTag(): false | string {
        const mainImgTags = this.doc.querySelectorAll('main img');
        return this.forEachWithBreak(Array.from(mainImgTags), imgTag => {
            const resultValue = imgTag.hasAttribute('src')
                && imgTag.getAttribute('src')
            return resultValue === null ? false : resultValue;
        })
    }

}

export const featuredImageParser = (doc: Document) => new FeaturedImageParser(doc);