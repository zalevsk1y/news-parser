import {MediaModel} from './MediaModel';
import {getAjaxNonce} from '../index'

export class PostModel{
    
    constructor({postData,restApiRoot,options,url}){
        this.content=this.formatParsedData(postData);
        this.title=postData.title;
        this.featuredMedia=postData.image;
        this.url=url
        if(!restApiRoot)throw new Error('No restApiRoot was set.')
        this.rootApi=restApiRoot;
        this.options=options;
        this.endPoint='wp/v2/posts';
        this.headers={
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
    }
    nonceAuth(nonce){
        this.headers['X-WP-Nonce']=nonce;
        return this;
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
            }
        })
        return postBody;
    }
    simpleText(text){
        let cleanContent=this.sanitize(text);
        return cleanContent;
    }
    paragraph(text){
        let cleanContent=this.sanitize(text),
            paragraph='<!-- wp:paragraph --><p>'+cleanContent+'</p><!-- /wp:paragraph -->';
        return paragraph;
    }
    heading(text,type){
        let cleanContent=this.sanitize(text),
            level=type.replace('h',''),
            heading='<!-- wp:heading {"level":'+level+'} --><'+type+'>'+cleanContent+'</'+type+'><!-- /wp:heading -->';
        return heading;
    }
    image(url,alt){
        let cleanUrl=this.sanitize(url),
            cleanAlt=this.sanitize(alt),
            image='<!-- wp:image --><figure class="wp-block-image"><img src="'+cleanUrl+'" alt="'+cleanAlt+'"/></figure><!-- /wp:image -->'
        return image;
    }
    list(listArray){
        let listBegin='<!-- wp:list --><ul>',
            list='',
            listEnd='</ul><!-- /wp:list -->';
            listArray.forEach(item=>{
                list+='<li>'+item+'</li>'
            })
        return listBegin+list+listEnd;

    }
    quote(text){
        let cleanContent=this.sanitize(text),   
            quote='<!-- wp:quote --><blockquote class="wp-block-quote"><p>'+cleanContent+'</p><p></p></blockquote><!-- /wp:quote -->';
        return quote;
    }
    sanitize(content){
        return content.replace(/<.*?>/g,'');
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
    createMedia(){
        let media= new MediaModel(this.rootApi);
        return media
    }

}