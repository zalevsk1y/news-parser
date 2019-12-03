
import {sprintf,escHTML} from '@news-parser/helpers';
import {Rest} from './Rest';
import {sortByOffset} from '../traits/sortByOffset';

export class PostModel extends Rest{
    
    constructor({postData,restApiRoot,options,url}){
        super(restApiRoot);
        this.content=this.formatParsedData(postData);
        this.title=postData.title;
        this.featuredMedia=postData.image;
        this.url=url
        this.options=options;
        this.endPoint='wp/v2/posts';
        this.sortByOffset=sortByOffset;
       
    }
    createPostDraft(){
        let url=this.rootApi+this.endPoint,
            body={
                status:'draft',
                title:this.title,
                content:this.content
            },
            $this=this;
            
        return fetch(url,{
                method:'POST',
                headers:this.headers,
                body:JSON.stringify(body)
             }).then(response=>response.json())
             .then(postData=>{
                $this.id=postData.id;
                return postData;
             })

    }
    updatePost(params){
        if(!this.id)throw new Error('No post ID was set. Post could not be updated');
        let url=this.rootApi+this.endPoint+'/'+this.id;
        return fetch(url,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(params)
        })
        .then(response=>response.json())
    }
    
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
                case 'VIDEO':
                    postBody+=this.youtubeVideo(item.content);
                    break;
            }
        })
        return postBody;
    }
    simpleText(text){
        let cleanContent=this.sanitize(text);
        return cleanContent;
    }
    youtubeVideo(hash){
        let video='<!-- wp:core-embed/youtube {"url":"https://youtu.be/%1$s","type":"video","providerNameSlug":"youtube","className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->'+
            '<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">'+
            'https://youtu.be/%1$s</div></figure><!-- /wp:core-embed/youtube -->',
            cleanHash=hash.replace(/[^a-zA-Z\_]/g,'');
        return sprintf(video,cleanHash)

    }
    paragraph(text){
        let paragraph='<!-- wp:paragraph --><p>%s</p><!-- /wp:paragraph -->';
        return sprintf(paragraph,this.sanitize(text));
    }
    heading(text,type){
        let cleanContent=this.sanitize(text),
            level=type.replace('h',''),
            heading='<!-- wp:heading {"level":%1$s} --><%2$s>%3$s</%2$s><!-- /wp:heading -->';
        return sprintf(heading,level,this.sanitize(type),cleanContent);
    }
    image(url,alt){
        let cleanUrl=this.sanitize(url),
            cleanAlt=this.sanitize(alt),
            image='<!-- wp:image --><figure class="wp-block-image"><img src="%s" alt="%s"/></figure><!-- /wp:image -->'
        return sprintf(image,cleanUrl,cleanAlt);
    }
    list(listArray){
        let listBegin='<!-- wp:list --><ul>',
            list='',
            listEnd='</ul><!-- /wp:list -->';
            listArray.forEach(item=>{
                list+='<li>'+this.sanitize(item)+'</li>'
            })
        return listBegin+list+listEnd;

    }
    quote(text){
        let cleanContent=this.sanitize(text),   
            quote='<!-- wp:quote --><blockquote class="wp-block-quote"><p>%s</p><p></p></blockquote><!-- /wp:quote -->';
        return sprintf(quote,cleanContent);
    }
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
    sanitize(content){
        return escHTML(content);
    }
   


}