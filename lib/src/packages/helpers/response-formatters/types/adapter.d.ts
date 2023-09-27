export type ImageContentType={
    src:string,
    alt:string,
    srcSet?:string,
    sizes?:string
}
/**
 * Transforms parsed data to HTML markup.
 * 
 */
export interface AdapterInterface{
    /**
     * Format youtube video block.
     * 
     * @param {string} hash Youtube video hash
     * @returns {string}
     */
    youtubeVideo(hash:string):string

    /**
     * Format paragraph data.
     * 
     * @param {string} text 
     * @returns {string}
     */
    paragraph(text:string):string

    /**
     * Format heading tag data to gutenberg heading block.
     * 
     * @param {string} text header text
     * @param {string} type level of heading h1 - h6
     * @returns {string}
     */
    heading(text:string, type:string):string 

    /**
     * Format image tag data to gutenberg image block. 
     * 
     * @param {ImageContent} imageContent Object with img tag attributes like src srcSet sizes and alt
     * @returns {string}
     */
    image(imageContent:ImageContentType):string 

    /**
     * Format list tag data to gutenberg list block. 
     * 
     * @param {array} listArray ar ray of list items text
     * @returns {string}
     */
    list(listArray:Array<string>):string 

    /**
     * Format quote tag data to gutenberg quote block.
     * 
     * @param {string} text
     * @returns {string}  
     */
    quote(text:string):string 

    groupRow(guttenbergBlocksArray:[string,string]):string
}

