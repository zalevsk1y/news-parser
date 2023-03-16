import {hash} from '@news-parser/helpers';
/**
 * Get HTML element data.
 * 
 * @since 1.0.0
 */
export class Parser{
    constructor(frameElement){
        this.document=frameElement.contentWindow.document;
    }
    /**
     * Get HTMLElements data.
     * 
     * @param {object} el HTMLElement.
     * @return {object}
     */
    parseElementData(el){
        const element=el,
            parsedData={};
        parsedData.tagName=element.tagName;
        parsedData.className=element.className.replace(' parser-select','').replace(' mouse-over','');
        switch (parsedData.tagName){
            case 'IMG':
                parsedData.content=this.parseImageContent(element);
                break;
            case 'UL':
                parsedData.content=this.parseListContent(element);
                break;
            case 'VIDEO':
                parsedData.content=element.dataset.hash||false;
                parsedData.tagName='IFRAME';
                parsedData.className=element.className.replace('news-parser-youtube','').replace(' parser-select','').replace(' mouse-over',''); 
                break;
            default:
                parsedData.content=element.innerText;
        }
        parsedData.offsetTop=this.getOffsetTop(element);
        parsedData.parent=this.getParentsArray(element);
        let elementHash=hash(Math.random().toString());
        return {
            elementHash,
            parsedData
        }
    }
    /**
     * Get offset top of element.
     * 
     * @param {object} element HTMLElement
     * @returns {number}
     */
    getOffsetTop(element){
        let bodyScrollTop=this.document.body.scrollTop;
        return element.getBoundingClientRect().top+bodyScrollTop;
    }
    /**
     * Get <img> tag data.
     * 
     * @param {object} el HTMLElement.
     * @returns {object}
     */
    parseImageContent(el){
        const element=el,
            sourceTag=element.parentElement.getElementsByTagName('source');
       if(sourceTag.length==0){
            return {
                src:element.src,
                srcSet:element.srcset,
                sizes:element.sizes,
                alt:element.alt
            }
        }
        if(sourceTag.length>0){
            return {
                src:sourceTag.src!==''?element.src:sourceTag[0].src,
                srcset:sourceTag[0].srcset,
                sizes:sourceTag[0].sizes,
                alt:element.alt
            }
        }
        
    }
    /**
     * Get <ul> tag data.
     * 
     * @param {object} el HTMLElement
     */
    parseListContent(el){
        const liCollection=el.children;
        if(!liCollection.length) return [];
        return Array.prototype.map.call(liCollection,(item)=>{
            return item.innerText;
        })
    }
    /**
     * Get array of element parents.
     * 
     * @param {object} el HTMLElement
     * @returns {array} 
     */
    getParentsArray(el){
        const element=el;
        let parentElement=element.parentElement,
            parent=[];
        while(true){
            if(parentElement.className){
                parent.push({
                    className:parentElement.className,
                    tagName:parentElement.tagName
                })
            }
            if (parentElement.tagName==='BODY'){
                break;
            }
            parentElement=parentElement.parentElement;
        }
        return parent;
    }
}