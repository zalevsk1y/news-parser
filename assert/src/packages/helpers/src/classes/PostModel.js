import {sprintf,escHTML} from '@news-parser/helpers';
import {Rest} from './Rest';
/**
 * Format data to create wordpress post draft using REST API.
 * 
 * @since 1.0.0
 */
export class PostModel extends Rest{
    
    constructor(restApiRoot){
        super(restApiRoot);
        this.suffix='wp/v2/posts';
    }
    /**
     * Format and send request to create post draft.
     * 
     * @param {object} postData 
     * @param {object} options 
     * @param {string} url 
     * @returns {Promise}
     */
    createPostDraft(postData,options,url){
        let argsError=this.checkArgs({postData,options,url});
        if(argsError instanceof Error) throw argsError;
        let requestUrl=this.endPoint+this.suffix,
            body={
                status:'draft',
                title:postData.title,
                content:this.formatParsedData(postData)
            },
            $this=this;
        return fetch(requestUrl,{
                method:'POST',
                headers:this.headers,
                body:JSON.stringify(body)
             }).then(response=>response.json())
             .then(postData=>{
                $this.id=postData.id;
                return postData;
             })
    }
    /**
     * Update exist post data.
     * 
     * @param {object} params 
     */
    updatePost(params){
        if(this.id===undefined)throw new Error('No post ID was set. Post could not be updated');
        let url=this.rootApi+this.endPoint+'/'+this.id;
        return fetch(url,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(params)
        })
        .then(response=>response.json())
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
        return postBody;
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
        let video='<!-- wp:core-embed/youtube {"url":"https://youtu.be/%1$s","type":"video","providerNameSlug":"youtube","className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->'+
            '<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">'+
            'https://youtu.be/%1$s</div></figure><!-- /wp:core-embed/youtube -->',
            cleanHash=hash.replace(/[^0-9a-zA-Z\_]/g,'');
        return sprintf(video,cleanHash)
    }
    /**
     * Format paragraph tag data to gutenberg paragraph block data.
     * 
     * @param {string} text 
     * @return {string}
     */
    paragraph(text){
        let paragraph='<!-- wp:paragraph --><p>%s</p><!-- /wp:paragraph -->';
        return sprintf(paragraph,this.sanitize(text));
    }
    /**
     * Format heading tag data to gutenberg heading block.
     * 
     * @param {string} text 
     * @param {string} type 
     * @return {string}
     */
    heading(text,type){
        let cleanContent=this.sanitize(text),
            level=type.replace('h',''),
            heading='<!-- wp:heading {"level":%1$s} --><%2$s>%3$s</%2$s><!-- /wp:heading -->';
        return sprintf(heading,level,this.sanitize(type),cleanContent);
    }
    /**
     * Format image tag data to gutenberg image block. 
     * 
     * @param {string} url 
     * @param {string} alt 
     * @returns {string}
     */
    image(url,alt){
        let cleanUrl=this.sanitize(url),
            cleanAlt=this.sanitize(alt),
            image='<!-- wp:image --><figure class="wp-block-image"><img src="%s" alt="%s"/></figure><!-- /wp:image -->'
        return sprintf(image,cleanUrl,cleanAlt);
    }
    /**
     * Format list tag data to gutenberg list block. 
     * 
     * @param {array} listArray 
     * @return {string}
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
   


}