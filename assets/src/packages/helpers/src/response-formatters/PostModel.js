import {escHTML,escURLRaw} from '@news-parser/helpers';
import {BaseClass} from '../classes/BaseClass'
/**
 * Format data for request to create wordpress post draft.
 * 
 * @since 1.0.0
 */
export class PostModel extends BaseClass{
    constructor(){
        super();
    }
    /**
     * Format request to create post draft.
     * 
     * @param {object} postData 
     * @param {object} options 
     * @param {string} url 
     * @returns {Promise}
     */
    createPostDraft(postData,options,url){
        const argsError=this.argsCheck({postData,options,url});
        if(argsError instanceof Error) throw argsError;
        this.url=url;
        this.options=options;
        return {
                title:postData.title,
                content:this.formatParsedData(postData)
            }
    }

    /**
     * Format parsed data.
     * 
     * @param {object} content 
     * @return {string}
     */
    formatParsedData(content){
        const contentArray=this.sortByOffset(content.body);
        let postBody='';
        contentArray.forEach(item=>{
            switch(item.tagName){
                case 'SPAN':
                    postBody+=this.simpleText(item.content);
                    break;
                case 'DIV':
                case 'P':
                    postBody+=this.paragraph(item.content);
                    break;
                case 'IMG':
                    postBody+=this.image(item.content.src,item.content.alt);
                    break;
                case 'H1':
                case 'H2':
                case 'H3':
                    postBody+=this.heading(item.content,item.tagName.toLowerCase());
                    break;
                case 'UL':
                    postBody+=this.list(item.content);
                    break;
                case 'IFRAME':
                    postBody+=this.youtubeVideo(item.content);
                    break;
            }
        })
        if(this.options.addSource){
            postBody+=this.addSourceLink(this.url);
        }
        return postBody;
    }
    /**
     * Add link to the source page.
     *  
     * @param {string} link 
     * @returns {string}
     */
    addSourceLink(link){
        return `<a link="${this.sanitizeUrl(link)}">Source</a>`
    }
    /**
     * Format text content.
     * 
     * @param {string} text 
     */
    simpleText(text){
        let cleanContent=this.sanitize(text);
        return cleanContent;
    }
    /**
     * Format youtube video as gutenberg video block.
     * 
     * @param {string} hash Youtube video hash
     * @returns {string}
     */
    youtubeVideo(hash){
        const cleanHash=hash.replace(/[^0-9a-zA-Z\_]/g,'');
        return `<!-- wp:core-embed/youtube {"url":"https://youtu.be/${cleanHash}","type":"video","providerNameSlug":"youtube","className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->`+
            `<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">`+
            `https://youtu.be/${cleanHash}</div></figure><!-- /wp:core-embed/youtube -->`;
    }
    /**
     * Format paragraph tag data to gutenberg paragraph block data.
     * 
     * @param {string} text 
     * @returns {string}
     */
    paragraph(text){
        return `<!-- wp:paragraph --><p>${this.sanitize(text)}</p><!-- /wp:paragraph -->`;
    }
    /**
     * Format heading tag data to gutenberg heading block.
     * 
     * @param {string} text 
     * @param {string} type 
     * @returns {string}
     */
    heading(text,type){
        return `<!-- wp:heading {"level":${type.replace('h','')}} --><${this.sanitize(type)}>${this.sanitize(text)}</${this.sanitize(type)}><!-- /wp:heading -->`;
    }
    /**
     * Format image tag data to gutenberg image block. 
     * 
     * @param {string} url 
     * @param {string} alt 
     * @returns {string}
     */
    image(url,alt){
        const cleanUrl=this.sanitize(url),
            cleanAlt=this.sanitize(alt);
        return `<!-- wp:image --><figure class="wp-block-image"><img src="${cleanUrl}" alt="${cleanAlt}"/></figure><!-- /wp:image -->`;
    }
    /**
     * Format list tag data to gutenberg list block. 
     * 
     * @param {array} listArray 
     * @returns {string}
     */
    list(listArray){
        let listBegin='<!-- wp:list --><ul>',
            list='',
            listEnd='</ul><!-- /wp:list -->';
            listArray.forEach(item=>{
                list+='<li>'+this.sanitize(item)+'</li>'
            })
        return listBegin+list+listEnd;
    }
    /**
     * Format quote tag data to gutenberg quote block.
     * 
     * @param {string} text
     * @returns {string}  
     */
    quote(text){
        let cleanContent=this.sanitize(text),   
            quote='<!-- wp:quote --><blockquote class="wp-block-quote"><p>%s</p><p></p></blockquote><!-- /wp:quote -->';
        return sprintf(quote,cleanContent);
    }
    /**
     * Sort elements data by offset of the top of page.
     * 
     * @param {object} objectOfContent 
     * @returns {array}
     */
    sortByOffset(objectOfContent){
        const sortedContent=[],
        objectCopy={...objectOfContent};
        
        while(true){
            if(!Object.keys(objectCopy).length) break;
            let minIndex={
                index:0,
                offsetTop:Math.pow(10,10)
            }
            for (var item in objectCopy){
                if(objectCopy[item].offsetTop<minIndex.offsetTop){
                    minIndex.offsetTop=objectCopy[item].offsetTop;
                    minIndex.index=item;
                }
            }
            sortedContent.push(objectCopy[minIndex.index]);
            delete objectCopy[minIndex.index]
        }
        return sortedContent;
    }
    /**
     * Sanitize data.
     * 
     * @param {string} content 
     * @returns {string}
     */
    sanitize(content){
        return escHTML(content);
    }
    /**
     * Sanitize url to insert into the link or src attributes.
     * 
     * @param {string} url 
     * @returns {string}
     */
    sanitizeUrl(url){
        return escURLRaw(url);
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

export const formatCreatePostDraftRequest=(postData,options,url)=>(new PostModel()).createPostDraft(postData,options,url);
