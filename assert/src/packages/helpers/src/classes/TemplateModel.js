

export class TemplateModel{
    constructor({postData,options,url,ajaxEndPoint}){
        this.endPoint=ajaxEndPoint;
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
            sortedData=this.sortByDOMPosition(cleanedData),
            container=this.createContainer(sortedData);
        let template={
                url:this.url,
                extraOptions:this.options,
                template:container
            };
        sortedData.forEach(item=>{
            let tagName=item.tagName.toLowerCase(),
                searchTemplate=this.createSearchTemplate(item,container.className);
            container.children.push({
                tagName,
                searchTemplate,
                position:'all'
            })
        })
        return template;
    }
    createContainer(arrayOfItems){
        
        let arrayOfParents=arrayOfItems[0].parent,
            $this=this;
        for(var key in arrayOfParents){
            let hasParent=true,
                parentItem=arrayOfParents[key];
            arrayOfItems.forEach(item=>{
                if(!$this.hasParent(item,parentItem)) hasParent=false;
            })
            
            if(hasParent){
                let className=parentItem.className.trim(),
                    tagName=parentItem.tagName.toLowerCase();
                return {
                    className,
                    tagName,
                    searchTemplate:tagName+'[class='+className+']',
                    children:[]
                }
            }
        }
    }
    hasParent(item,parentItem){
        for(var key in item.parent){
            let parent=item.parent[key];
            
            if(parent.tagName==parentItem.tagName&&parent.className==parentItem.className){
                return true;
            }
        }
        return false;
    }
    createSearchTemplate(item,containerClassName){
        let parentTagName=item.parent[0].tagName.toLowerCase(),
            parentClassName=item.parent[0].className.trim(),
            tagName=item.tagName.toLowerCase(),
            className=this.getClassName(item.className);
        return className?tagName+'.'+className:parentClassName!==containerClassName?parentTagName+'.'+this.getClassName(parentClassName)+' '+tagName:tagName;
    }
    getClassName(className,index=0){
        let classNameArray=className.trim().split(' '),
        noDigitsClassNames=classNameArray.filter(partName=>{
            if(partName.search(/([0-9])/g)===-1){
                return partName.trim();
            }
        });
        return noDigitsClassNames.length?noDigitsClassNames[index]:classNameArray[0];
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