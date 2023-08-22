import { PostData,ParsedData } from 'types/sidebarTemplate';
import { TemplateOptions, TemplatePostOptions } from 'types/template';
import { escHTML, escURLRaw } from '../index';
import { sprintf } from '..';
import { PostModelInterface } from './types/postModel';


/**
 * Format data for request to create wordpress post draft.
 * 
 * @since 1.0.0
 */
export class PostModel implements PostModelInterface {
    protected content: string

    constructor(protected postData: PostData, protected options: Partial<TemplatePostOptions>&TemplateOptions, protected url: string) {
        this.content = this.formatParsedData(postData.body);
    }

    /**
     * Format request to create post draft.
     * 
     * @param {object} postData 
     * @param {object} options 
     * @param {string} url 
     * @returns {Promise}
     */
    public generateWpPostData() {
        return {
            title: this.postData.title,
            content: this.content,
            ...this.options
        }
    }

    /**
     * Format parsed data.
     * 
     * @param {object} content 
     * @return {string}
     */
    protected formatParsedData(postData:PostData['body']):string {
        const contentArray = this.sortByOffset(postData);
        let postBody = '';
        contentArray.forEach(item => {
            switch (item.tagName) {
                case 'SPAN':
                    postBody += this.simpleText(item.content);
                    break;
                case 'DIV':
                case 'P':
                    postBody += this.paragraph(item.content);
                    break;
                case 'IMG':
                    postBody += this.image(item.content);
                    break;
                case 'H1':
                case 'H2':
                case 'H3':
                    postBody += this.heading(item.content, item.tagName.toLowerCase());
                    break;
                case 'UL':
                    postBody += this.list(item.content);
                    break;
                case 'IFRAME':
                    postBody += this.youtubeVideo(item.content);
                    break;
            }
        })
        if (this.options.addSource) {
            postBody += this.addSourceLink(this.url);
        }
        return postBody;
    }

    /**
     * Add link to the source page.
     *  
     * @param {string} link 
     * @returns {string}
     */
    protected addSourceLink(link:string):string {
        return `<a href='${this.sanitizeUrl(link)}'>Source</a>`
    }

    /**
     * Format text content.
     * 
     * @param {string} text 
     */
    protected simpleText(text:ParsedData['content']):string {
        const cleanContent = this.sanitize(text);
        return cleanContent;
    }

    /**
     * Format youtube video as gutenberg video block.
     * 
     * @param {string} hash Youtube video hash
     * @returns {string}
     */
    protected youtubeVideo(hash:ParsedData['content']):string {
        if(typeof hash !== 'string') return ''
        const cleanHash = hash.replace(/[^0-9a-zA-Z\_]/g, '');
        return `<!-- wp:core-embed/youtube {'url':'https://youtu.be/${cleanHash}','type':'video','providerNameSlug':'youtube','className':'wp-embed-aspect-16-9 wp-has-aspect-ratio'} -->` +
            `<figure class='wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio'><div class='wp-block-embed__wrapper'>` +
            `https://youtu.be/${cleanHash}</div></figure><!-- /wp:core-embed/youtube -->`;
    }

    /**
     * Format paragraph tag data to gutenberg paragraph block data.
     * 
     * @param {string} text 
     * @returns {string}
     */
    protected paragraph(text:ParsedData['content']):string {
        return `<!-- wp:paragraph --><p>${this.sanitize(text)}</p><!-- /wp:paragraph -->`;
    }

    /**
     * Format heading tag data to gutenberg heading block.
     * 
     * @param {string} text 
     * @param {string} type 
     * @returns {string}
     */
    protected heading(text:ParsedData['content'], type:string):string {
        if(typeof text!=='string'||typeof 'type'!=='string') return ''
        return `<!-- wp:heading {'level':${type.replace('h', '')}} --><${this.sanitize(type)}>${this.sanitize(text)}</${this.sanitize(type)}><!-- /wp:heading -->`;
    }

    /**
     * Format image tag data to gutenberg image block. 
     * 
     * @param {ImageContent} imageContent 
     * @returns {string}
     */
    protected image(imageContent:ParsedData['content']):string {
        if(typeof imageContent==='string'||Array.isArray(imageContent)||imageContent==undefined) return '';
        const {src,srcSet,alt}=imageContent;
        const parsedSrc= srcSet && this.getSrcFromSrcSet(srcSet);
        const cleanSrc = parsedSrc ? this.sanitize(parsedSrc) : this.sanitize(src);
            const cleanAlt = this.sanitize(alt);
        return `<!-- wp:image --><figure class='wp-block-image'><img src='${cleanSrc}' alt='${cleanAlt}'/></figure><!-- /wp:image -->`;
    }

    /**
     * Format list tag data to gutenberg list block. 
     * 
     * @param {array} listArray 
     * @returns {string}
     */
    protected list(listArray:ParsedData['content']):string {
        if(!Array.isArray(listArray)) return '';
        const listBegin = '<!-- wp:list --><ul>';
            let list = '';
            const listEnd = '</ul><!-- /wp:list -->';
        listArray.forEach(item => {
            list += `<li>${  this.sanitize(item)  }</li>`
        })
        return listBegin + list + listEnd;
    }

    /**
     * Format quote tag data to gutenberg quote block.
     * 
     * @param {string} text
     * @returns {string}  
     */
    protected quote(text:string):string {
        const cleanContent = this.sanitize(text);
            const quote = '<!-- wp:quote --><blockquote class="wp-block - quote"><p>%s</p><p></p></blockquote><!-- /wp:quote -->';
        return sprintf(quote, cleanContent);
    }

    /**
     * Sort elements data by offset of the top of page.
     * 
     * @param {object} objectOfContent 
     * @returns {array}
     */
    protected sortByOffset(postData:PostData['body']):ParsedData[] {
        const sortedContent:Array<ParsedData> = [];
            const postDataMap:Map<string ,ParsedData> = new Map(Object.entries(postData));

        while (true) {
            if (postDataMap.size===0) break;
            const topElement:{
                hash:string,
                offsetTop:number
            } = {
                hash: '',
                offsetTop: 10**10
            }
            postDataMap.forEach((item:ParsedData,hash:string)=>{
                if (item.offsetTop < topElement.offsetTop) {
                    topElement.offsetTop = item.offsetTop;
                    topElement.hash = hash;
                }
            })
            const postData=postDataMap.get(topElement.hash);
            if (postData!==undefined) sortedContent.push(postData);
            postDataMap.delete(topElement.hash)
        }
        return sortedContent;
    }

    /**
     * Sanitize data.
     * 
     * @param {string} content 
     * @returns {string}
     */
    protected sanitize(content:ParsedData['content']):string {
        if(typeof content!=='string') return ''
        return escHTML(content);
    }

    /**
     * Sanitize url to insert into the link or src attributes.
     * 
     * @param {string} url 
     * @returns {string}
     */
    protected sanitizeUrl(url:string):string {
        return escURLRaw(url);
    }

    /**
     * Get src from srcset
     * 
     * @param {string} srcSet
     * @param {number} index
     */
    protected getSrcFromSrcSet(srcSet:string, index:number = -2):string|false {
        const srcSetArr:Array<string> = srcSet.split(',');
        if (srcSetArr.length <= Math.abs(index)) throw new Error('Given index in greater then number of srcset breakpoints');
        const srcMediaElement=srcSetArr.at(index)
        if(srcMediaElement!==undefined) return srcMediaElement.trim().replace(/\s.*w/, '');
        return false;
    }

}
/**
 * Facade function for PostModel class.
 * 
 * @param {object} postData 
 * @param {object} options 
 * @param {string} url
 * @returns {string} 
 */

export const formatCreatePostDraftRequest = (postData:PostData, options:Partial<TemplatePostOptions>&TemplateOptions, url:string) => ((new PostModel(postData, options, url)).generateWpPostData());
