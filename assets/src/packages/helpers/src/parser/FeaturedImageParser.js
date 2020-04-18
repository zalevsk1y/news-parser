import ArrayExtendedMethods from '../classes/classesForExtend/ArrayExtenedMethods';
/**
 * Class finds main image of the article or post.
 * 
 * @since 1.0.2
 * 
 * @param {object} HTML document
 */
export default class FeaturedImageParser extends ArrayExtendedMethods {
    constructor(doc){
        super();
        if(doc===undefined) throw Error('HTML document argument could not be undefined.');
        this.doc=doc;
    }
    /**
     * Parse main image of post or article using methods from array.
     * 
     * @extends ArrayExtendedMethods.reduceWithBreak()
     * @returns {false|string} source url of main post image.
     */
    findFeaturedImage(){
        const arrayOfParseCallbacks=[
            this.findUsingSchema,
            this.findInArticleTag,
            this.findInMainTag
        ]
        return this.reduceWithBreak(arrayOfParseCallbacks,[this.doc]);
    }
    /**
     * Search image using schema.org markup
     * 
     * @extends ArrayExtendedMethods.forEachWithBreak()
     * @param {object} HTML document 
     * @returns {false|string}
     */
    findUsingSchema(){
        let metaTags=this.doc.getElementsByTagName('meta');
        return this.forEachWithBreak(metaTags,metaTag=>metaTag.hasAttribute('property')
                &&metaTag.getAttribute('property')==='og:image'
                &&metaTag.hasAttribute('content')
                &&metaTag.getAttribute('content'));
    }
    /**
     * Search for image in article tag.
     * 
     *  @extends ArrayExtendedMethods.forEachWithBreak()
     *  @param {object} HTML document 
     *  @returns {false|string} 
     */
    findInArticleTag(){
        let articleImgTags=this.doc.querySelectorAll('article img');
        return this.forEachWithBreak(articleImgTags,imgTag=>imgTag.hasAttribute('src')
                &&imgTag.getAttribute('src'))
    }
    /**
     * Search for image in main tag.
     * 
     * @extends ArrayExtendedMethods.forEachWithBreak()
     * @param {object} HTML document 
     * @returns {false|string} 
     */
    findInMainTag(){
        let mainImgTags=this.doc.querySelectorAll('main img');
        return this.forEachWithBreak(mainImgTags,imgTag=>imgTag.hasAttribute('src')
                &&imgTag.getAttribute('src'))
    }
    
}

export const featuredImageParser=doc=>new FeaturedImageParser(doc);