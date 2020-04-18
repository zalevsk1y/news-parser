import ArrayExtendedMethods from '../classes/classesForExtend/ArrayExtenedMethods';
/**
 * Class parse title of the post.
 * 
 * @since 1.0.2
 * 
 */
export default class PostTitleParser extends ArrayExtendedMethods{
    /**
     * Constructor.
     * 
     * @throws Error
     * @param {object} HTML document
     */
    constructor(doc){
        super();
        if(doc===undefined) throw Error('HTML document argument could not be undefined.');
        this.doc=doc;
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
    findUsingSchema(){
        let metaTags=this.doc.getElementsByTagName('meta');
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
    findUsingHeaderTag(){
        let h1Tag=this.doc.getElementsByTagName('h1');
        return h1Tag.length>0?h1Tag[0].textContent:false;
    }

}

export const postTitleParser=doc=>new PostTitleParser(doc);