import ArrayExtendedMethods from '../classes/classesForExtend/ArrayExtenedMethods';
import { PostTitleParserInterface } from './types';
/**
 * Class parse title of the post.
 * 
 * @since 1.0.2
 * 
 */
export default class PostTitleParser extends ArrayExtendedMethods implements PostTitleParserInterface {
    /**
     * Constructor.
     * 
     * @throws Error
     * @param {object} HTML document
     */
    constructor(protected doc: Document) {
        super();
        if (doc === undefined) throw Error('HTML document argument could not be undefined.');
    }

    /**
     * Search and parse post title.
     * 
     * @extends ArrayExtendedMethods.reduceWithBreak()
     * @return {false|string} Post title.
     */
    public findTitle(): false | string {
        const arrayOfParseCallbacks = [
            this.findUsingSchema,
            this.findUsingHeaderTag
        ];
        return this.reduceWithBreak(arrayOfParseCallbacks, [this.doc])
    }

    /**
     * Search title using schema.org markup
     * 
     * @extends ArrayExtendedMethods.forEachWithBreak() 
     * @returns {false|string}
     */
    protected findUsingSchema(): false | string {
        const metaTags = this.doc.getElementsByTagName('meta');
        return this.forEachWithBreak<HTMLMetaElement, string>(Array.from(metaTags), metaTag => {
            const resultValue = metaTag.hasAttribute('property')
                && metaTag.getAttribute('property') === 'og:title'
                && metaTag.hasAttribute('content')
                && metaTag.getAttribute('content');
            return resultValue === null ? false : resultValue;
        });
    }

    /**
     * Search title in h1 tag.
     * 
     * @param {object} HTML document 
     * @returns {false|string}
     */
    protected findUsingHeaderTag(): false | string {
        const h1Tag = this.doc.getElementsByTagName('h1');
        return h1Tag.length > 0 ? h1Tag[0].textContent === null ? false : h1Tag[0].textContent : false;
    }

}

export const postTitleParser = (doc: Document) => new PostTitleParser(doc);