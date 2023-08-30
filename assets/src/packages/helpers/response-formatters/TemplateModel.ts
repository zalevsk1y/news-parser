import { ParentElement, ParsedData , PostData  } from "types/sidebarTemplate";
import { TemplateData, TemplateOptions } from "types/template";
import { TemplateModelInterface,TemplateContainer } from "./types/templateModel";

/**
 * Create parsing template for automated parsing.
 * 
 * @since 1.0.0
 */
export class TemplateModel implements TemplateModelInterface{

    constructor (protected postData:PostData,protected options:TemplateOptions,protected url:string){

    }
    /**
     * Create parsing template from selected in visual constructor blocks.
     * 
     * @returns {object} template object.
     */

    public createTemplateData():TemplateData {
        const arrayOfElements:ParsedData[] = Object.values(this.postData.body);
            const cleanedData = this.removeDuplicate(arrayOfElements);
            const sortedData = this.sortByDOMPosition(cleanedData);
            const container = this.createContainer(sortedData);
        const template:TemplateData = {
            url: this.url,
            extraOptions: this.options,
            template: container
        };
        if(container===undefined) return template
        sortedData.forEach(item => {
            const tagName = item.tagName.toLowerCase();
                const searchTemplate = this.createSearchTemplate(item, container.className);
            container.children.push({
                tagName,
                searchTemplate,
                position: 'all'
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
    protected createContainer(arrayOfItems:ParsedData[]):TemplateContainer|undefined {
        const arrayOfParents = arrayOfItems[0].parent;
        for (const key in arrayOfParents) {
            let hasParent = true;
                const parentItem = arrayOfParents[key];
            arrayOfItems.forEach(item => {
                if (!this.hasParent(item, parentItem)) hasParent = false;
            })

            if (hasParent) {
                const className = parentItem.className.trim();
                    const tagName = parentItem.tagName.toLowerCase();
                return {
                    className,
                    tagName,
                    searchTemplate: `${tagName  }[class=${  className  }]`,
                    children: []
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
    hasParent(item:ParsedData, parentItem:ParentElement):boolean {
        for (const key in item.parent) {
            const parent = item.parent[key];

            if (parent.tagName == parentItem.tagName && parent.className == parentItem.className) {
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
    createSearchTemplate(item:ParsedData, containerClassName:string):string {
        const parentTagName = item.parent[0].tagName.toLowerCase();
            const parentClassName = item.parent[0].className.trim();
            const tagName = item.tagName.toLowerCase();
            const className = item.className!==undefined?this.getClassName(item.className):'';
        return className ? `${tagName  }.${  className}` : parentClassName !== containerClassName ? `${parentTagName  }.${  this.getClassName(parentClassName)  } ${  tagName}` : tagName;
    }

    /**
     * Get class name (with no digit) of HTML block. 
     * 
     * @param {string} className 
     * @param {number} index Position in className string.
     * @returns {string} 
     */
    getClassName(className:string, index = 0):string {
        const classNameArray = className.trim().split(' ');
            const noDigitsClassNames = classNameArray.filter(partName => {
                if (partName.search(/([0-9])/g) === -1) {
                    return partName.trim();
                }
            });
        return noDigitsClassNames.length ? noDigitsClassNames[index] : classNameArray[0];
    }

    /**
     * Removes duplicated HTML blocks.
     * 
     * @param {array} arrayOfItems 
     * @returns {array}
     */
    removeDuplicate(arrayOfItems:ParsedData[]):ParsedData[] {
        let tempArray = [...arrayOfItems];
        const newArray = [];
        while (true) {
            if(tempArray.length==0) break;
            const itemObject = tempArray.shift() as ParsedData;
            tempArray = tempArray.filter(item => {
                if (!this.theSame(itemObject, item)) return item;
            })
            newArray.push(itemObject);
            if (tempArray.length <= 1) {
                tempArray.length === 1 && newArray.push(tempArray[0]);
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
    theSame(itemObject1:ParsedData|undefined, itemObject2:ParsedData|undefined):boolean {
        if(itemObject1===undefined||itemObject2===undefined) return false
        if (itemObject1.tagName !== itemObject2.tagName) {
            return false;
        }
        if (itemObject1.className !== itemObject2.className) {
            return false;
        }
        if (itemObject1.parent.length !== itemObject2.parent.length) {
            return false;
        }
        return true;
    }

    /**
     * Sorting HTML blocks by number of parents.
     * 
     * @param {array} arrayOfElements 
     * @returns {array}
     */
    sortByDOMPosition(arrayOfElements:ParsedData[]) {
        const newArray = [...arrayOfElements];
        newArray.sort((item1, item2) => item1.parent.length - item2.parent.length)
        return newArray;
    }


}

/** 
 * Create parsing template from selected in visual constructor blocks.
 * 
 * @param {object} postData 
 * @param {object} options 
 * @param {string} url 
 * @returns {object} template object.
 */
export const formatCreateTemplateRequest = (postData:PostData,options:TemplateOptions,url:string) => (new TemplateModel(postData, options, url)).createTemplateData();