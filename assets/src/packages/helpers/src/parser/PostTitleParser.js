import ArrayExtendedMethods from '../classes/classesForExtend/ArrayExtenedMethods';
/**
 * Class parse title of the post.
 * 
 * @since 1.0.2
 * 
 */
class PostTitleParser extends ArrayExtendedMethods{
    /**
     * Constructor.
     * 
     * @throws Error
     * @param {object} HTML document
     */
    constructor(document){
        if(document===undefined) throw Error('HTML document argument could not be undefined.');
        this.doc=document;
    }
    /**
     * Search and parse post title.
     * 
     * @extends ArrayExtendedMethods.reduceWithBreak()
     * @return {false|string} Post title.
     */
    findTitle(){
        const arrayOfParseCallbacks=[
            this.findUsingSchema,
            this.findUsingHeaderTag
        ];
        return this.reduceWithBreak(arrayOfParseCallbacks,[this.doc])
    }
    /**
     * Search title using schema.org markup
     * 
     * @extends ArrayExtendedMethods.forEachWithBreak()
     * @param {object} HTML document 
     * @returns {false|string}
     */
    findUsingSchema(doc){
        let metaTags=doc.getElemntsByTagName('meta');
        return this.forEachWithBreak(metaTags,metaTag=>metaTag.hasAttribute('property')
                &&metaTag.getAttribute('property')==='og:title'
                &&metaTag.hasAttribute('content')
                &&metaTag.getAttribute('content'));
    }
    /**
     * Search title in h1 tag.
     * 
     * @param {object} HTML document 
     * @returns {false|string}
     */
    findUsingHeaderTag(doc){
        let h1Tag=doc.getElemntsByTagName('h1');
        return h1Tag.length>0?h1Tag[0].innerText:false;
    }

}

export default document=>new PostTitleParser(document);