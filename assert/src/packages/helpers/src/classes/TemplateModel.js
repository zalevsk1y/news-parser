import {Ajax} from './Ajax';
/**
 * Create parsing template for automated parsing.
 * 
 * @since 1.0.0
 */
export class TemplateModel extends Ajax{
    constructor(ajaxEndPoint){
        super(ajaxEndPoint);
    }  
    /**
     * Create parsing template from selected in visual constructor blocks.
     * 
     * @param {object} postData 
     * @param {object} options 
     * @param {string} url 
     * @returns {object} template object.
     */
    create(postData,options,url){
        let argsError=this.checkArgs({postData,options,url});
        if(argsError instanceof Error) throw argsError;
        const arrayOfElements=Object.keys(postData.body).map(propName=>{
                return postData.body[propName]
                }),
             cleanedData=this.removeDuplicate(arrayOfElements),
             sortedData=this.sortByDOMPosition(cleanedData),
             container=this.createContainer(sortedData);
        let template={
                url:url,
                extraOptions:options,
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
    /**
     * Find common parent of HTML blocks.
     * 
     * @param {array} arrayOfItems 
     * @returns {object}
     */
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
    /**
     * Check if HTML block has parent.
     * 
     * @param {object} item 
     * @param {object} parentItem
     * @returns {boolean} 
     */
    hasParent(item,parentItem){
        for(var key in item.parent){
            let parent=item.parent[key];
            
            if(parent.tagName==parentItem.tagName&&parent.className==parentItem.className){
                return true;
            }
        }
        return false;
    }
    /**
     * Create search string for php-simple-html-dom-parser (https://simplehtmldom.sourceforge.io/) 
     * 
     * @param {object} item 
     * @param {object} containerClassName 
     * @return {string}
     */
    createSearchTemplate(item,containerClassName){
        let parentTagName=item.parent[0].tagName.toLowerCase(),
            parentClassName=item.parent[0].className.trim(),
            tagName=item.tagName.toLowerCase(),
            className=this.getClassName(item.className);
        return className?tagName+'.'+className:parentClassName!==containerClassName?parentTagName+'.'+this.getClassName(parentClassName)+' '+tagName:tagName;
    }
    /**
     * Get class name (with no digit) of HTML block. 
     * 
     * @param {string} className 
     * @param {number} index Position in className string.
     * @returns {string} 
     */
    getClassName(className,index=0){
        let classNameArray=className.trim().split(' '),
        noDigitsClassNames=classNameArray.filter(partName=>{
            if(partName.search(/([0-9])/g)===-1){
                return partName.trim();
            }
        });
        return noDigitsClassNames.length?noDigitsClassNames[index]:classNameArray[0];
    }
    /**
     * Removes duplicated HTML blocks.
     * 
     * @param {array} arrayOfItems 
     * @returns {array}
     */
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
    /**
     * Check HTML blocks have the same attributes. 
     * 
     * @param {object} itemObject1 
     * @param {object} itemObject2
     * @return {boolean} 
     */
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
    /**
     * Sorting HTML blocks by number of parents.
     * 
     * @param {array} arrayOfElements 
     * @returns {array}
     */
    sortByDOMPosition(arrayOfElements){
        const newArray=[...arrayOfElements];
        newArray.sort((item1,item2)=>{
            return item1.parent.length-item2.parent.length;
        })
        return newArray;
    }
    /**
     * Save created template to server.
     * 
     * @returns {Promise}
     */
    save(postData,options,url){
        let argsError=this.checkArgs({postData,options,url});
        if(argsError instanceof Error) throw argsError;
        let template=this.create(postData,options,url),
        ajaxUrl=this.endPoint;
        if(this.nonce)ajaxUrl+='&_wpnonce='+this.nonce;
        return fetch(ajaxUrl,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(template)
        })
        .then(response=>response.json())
    }
   
}