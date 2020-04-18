import ArrayExtendedMethods from '../classes/classesForExtend/ArrayExtenedMethods';
/**
 * Class finds main image of the article or post.
 * 
 * @since 1.0.2
 * 
 * @param {object} HTML document
 */
class FeaturedImageParser extends ArrayExtendedMethods {
    constructor(document){
        if(document===undefined) throw Error('HTML document argument could not be undefined.');
        this.doc=document;
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
            this.findinArtileTag,
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
    findUsingSchema(doc){
        let metaTags=doc.getElemntsByTagName('meta');
        return this.forEachWithBreak(metaTags,metaTag=>metaTag.hasAttribute('property')
                &&metaTag.getAttribute('property')==='og:image'
                &&metaTag.hasAttribute('content')
                &&metaTag.getAttribute('content'));
    }
    /**
     * Search for image in article tag.
     * 
     *  @param {object} HTML document 
     *  @returns {false|string} 
     */
    findinArtileTag(doc){
        let articleImgTags=doc.querySelectorAll('article img');
        return this.forEachWithBreak(articleTags,imgTag=>imgTag.hasAttribute('src')
                &&imgTag.getAttribute('src'))
    }
    /**
     * Search for image in main tag.
     * 
     * @param {object} HTML document 
     * @returns {false|string} 
     */
    findInMainTag(doc){
        let mainImgTags=doc.querySelectorAll('main img');
        return this.forEachWithBreak(mainImgTags,imgTag=>imgTag.hasAttribute('src')
                &&imgTag.getAttribute('src'))
    }
    
}

export default document=>new FeaturedImageParser(document);