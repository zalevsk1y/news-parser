import {hash} from '@news-parser/helpers';
export class Parser{
    constructor(frameElement){
        this.document=frameElement.current.contentWindow.document;
    }
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
    getOffsetTop(element){
        let bodyScrollTop=this.document.body.scrollTop;
        return element.getBoundingClientRect().top+bodyScrollTop;
    }
    parseImageContent(el){
        const element=el;
        return {
            src:element.src,
            alt:element.alt
        }
    }
    parseListContent(el){
        const liCollection=el.children;
        if(!liCollection.length) return [];
        return Array.prototype.map.call(liCollection,(item)=>{
            return item.innerText;
        })
    }
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