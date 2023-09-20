import { ParsedData } from 'types/sidebarTemplate';
import { AdapterInterface } from '../types/adapter';


/**
 * Wrap HTML data with Guttenbewrg style comments to markup html code as Guttenberg blocks.
 * 
 * @since 1.0.0
 */
export class AdapterGuttenberg implements AdapterInterface {
    /**
     * Format youtube video as gutenberg video block.
     * 
     * @param {string} hash Youtube video hash
     * @returns {string}
     */
    public youtubeVideo(hash:string):string {
        if(typeof hash !== 'string') return '';
        return `<!-- wp:core-embed/youtube {'url':'https://youtu.be/${hash}','type':'video','providerNameSlug':'youtube','className':'wp-embed-aspect-16-9 wp-has-aspect-ratio'} -->` +
            `<figure class='wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio'><div class='wp-block-embed__wrapper'>` +
            `https://youtu.be/${hash}</div></figure><!-- /wp:core-embed/youtube -->`;
    }

    /**
     * Format paragraph tag data to gutenberg paragraph block data.
     * 
     * @param {string} text 
     * @returns {string}
     */
    public paragraph(text:ParsedData['content']):string {
        return `<!-- wp:paragraph --><p>${text}</p><!-- /wp:paragraph -->`;
    }

    /**
     * Format heading tag data to gutenberg heading block.
     * 
     * @param {string} text 
     * @param {string} type type of heding h1- h6
     * @returns {string}
     */
    public heading(text:string, type:string):string {
        return `<!-- wp:heading {"level":${type.replace('h', '')}} --><${type}>${text}</${type}><!-- /wp:heading -->`;
    }

    /**
     * Format image tag data to gutenberg image block. 
     * 
     * @param {ImageContent} imageContent 
     * @returns {string}
     */
    public image(imageContent:{src:string,alt:string,srcSet?:string,sizes?:string}):string {
        let {src,srcSet,sizes,alt}=imageContent;
        return `<!-- wp:image {"id":"null" "sizeSlug":"large" "url":"${src}" "alt": "${alt}"} --><figure class='wp-block-image'><img src="${src}" alt="${alt}" ${srcSet!==undefined?'srcset="'+srcSet+'"':''}  ${sizes!==undefined?'sizes="'+sizes+'"':''} /></figure><!-- /wp:image -->`;
    }
    /**
     * Join any two guttenberg blocks in one row block
     * 
     * @param guttenbergBlocksArray array of any two Guttenberg bloks
     * @returns {string}
     */
    public groupRow(guttenbergBlocksArray:[string,string]){
        return `<!-- wp:group {"className":"row","layout":{"type":"flex","flexWrap":"nowrap"}} --><div class="wp-block-group row ">${guttenbergBlocksArray.join('')}</div><!-- /wp:group -->`
    }
    /**
     * Format list tag data to gutenberg list block. 
     * 
     * @param {array} listArray 
     * @returns {string}
     */
    public list(listArray:Array<string>):string {
        const listBegin = '<!-- wp:list --><ul>';
            let list = '';
            const listEnd = '</ul><!-- /wp:list -->';
        listArray.forEach(item => {
            list += `<li>${  item  }</li>`
        })
        return listBegin + list + listEnd;
    }

    /**
     * Format quote tag data to gutenberg quote block.
     * 
     * @param {string} text
     * @returns {string}  
     */
    public quote(text:string):string {
        return `<!-- wp:quote --><blockquote class="wp-block - quote"><p>${text}</p><p></p></blockquote><!-- /wp:quote -->`;
    }

}

export const adapterGuttenberg=new AdapterGuttenberg()