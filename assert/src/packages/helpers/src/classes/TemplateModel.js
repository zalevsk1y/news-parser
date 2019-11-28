import {Rest} from './Rest';
import {sortByOffset} from '../traits/sortByOffset';

export class TemplateModel{
    constructor({postData,options,url,ajaxEndPoint}){
        this.endPoint=ajaxEndPoint;
        this.sortByOffset=sortByOffset;
        this.url=url;
        this.options=options;
        this.postData=postData;
        this.headers={
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
    }  
    nonceAuth(nonce){
        this.nonce=nonce;
        this.endPoint+='&_wpnonce='+this.nonce;
        return this;
    }
    create(){
        const $this=this,
            arrayOfElements=Object.keys(this.postData.body).map(propName=>{
                return $this.postData.body[propName]
            }),
            cleanedData=this.removeDuplicate(arrayOfElements),
            sortedData=this.sortByDOMPosition(cleanedData);
        let containerTagName=sortedData[0].parent[0].tagName.toLowerCase(),
            containerClassName=sortedData[0].parent[0].className.trim(),
            container={
                tagName:containerTagName,
                className:containerClassName,
                searchTemplate:containerTagName+'[class='+containerClassName+']',
                children:[]
        },
            template={
                url:this.url,
                extraOptions:this.options,
                template:container
            };
        sortedData.forEach(item=>{
            let tagName=item.tagName.toLowerCase(),
                searchTemplate=this.createSearchTemplate(item,containerClassName);
            container.children.push({
                tagName,
                searchTemplate,
                position:'all'
            })
        })
        return template;
    }
    createSearchTemplate(item,containerClassName){
        let classNameArray=item.className.trim().split(' '),
            className,
            parentTagName=item.parent[0].tagName.toLowerCase(),
            parentClassName=item.parent[0].className.trim(),
            tagName=item.tagName.toLowerCase();
        classNameArray.forEach(partName=>{
            if(partName.search(/([0-9])/g)===-1&&!className){
                className=partName;
            }
        });
        className=className||item.className.trim();
        return className?tagName+'[class='+className+']':parentClassName!==containerClassName?parentTagName+'[class='+parentClassName+'] '+tagName:tagName;
    }
    removeDuplicate(arrayOfItems){
        let tempArray=[...arrayOfItems];
        const newArray=[],
            $this=this;
        while(true){
            let itemObject=tempArray.shift();
            tempArray=tempArray.filter(item=>{
                if(!$this.theSame(itemObject,item)) return item;
            })
            newArray.push(itemObject);
            if(tempArray.length<=1)
            {
                tempArray.length===1&&newArray.push(tempArray[0]);
                break;
            }
        }
        return newArray;
    }
    theSame(itemObject1,itemObject2){
            let result=true;
            if(itemObject1.tagName!==itemObject2.tagName){
                return false;
            }
            if(itemObject1.className!==itemObject2.className){
                return false;
            }
            if(itemObject1.parent.length!==itemObject2.parent.length){
                return false;
            }
        return result;
    }
    sortByDOMPosition(arrayOfElements){
        const newArray=[...arrayOfElements];
        newArray.sort((item1,item2)=>{
            return item1.parent.length-item2.parent.length;
        })
        return newArray;
    }
    save(){
        let template=this.create();
        return fetch(this.endPoint,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(template)
        })
        .then(response=>response.json())
    }
}