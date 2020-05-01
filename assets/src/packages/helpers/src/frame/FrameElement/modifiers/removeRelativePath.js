
/**
 * Class replace relative path in tags attributes to absolute.
 * 
 * @since 1.0.3
 */
export class ReplaceRelativePath{
    /**
     * Init function 
     * 
     * @param {object} document DOM document
     * @param {string} url url of the page
     */
    constructor(document,url){
        this.document=document;
        this.url=url
    }
    /**
     * 
     * @param {array} tagNamesArray 
     */
    replace(tagNamesArray){
        const publicPathPrefix=this.getDomain(this.url);
            tagNamesArray.forEach(tagName=>{
            const tagsList=this.doc.getElementsByTagName(tagName);
            tagsList.forEach(el=>{
                var attrName;
                switch (tagName){
                    case 'link':
                        attrName='href';
                        break;
                    case 'img':
                        attrName=['src','srcset']
                }
                this.replacePath(el,attrName,publicPathPrefix);
            })
        })
    }
    /**
     * 
     * @param {object} el HTML element
     * @param {string|array} attr attribute names
     * @param {string} publicPathPrefix  public path absolute prefix
     */
    replacePath(el,attr,publicPathPrefix){
        const replaceAttr=(attr)=>{
            const attrValue=el.getAttribute(attr).split(','),
                modifiedAttrValue=attrValue.map(value=>value.indexOf('/')!==0?value:publicPathPrefix+value).join(',');
            el.setAttribute(attr,modifiedAttrValue);
        }
        if (Array.isArray(attr)){
            attr.forEach(attrName=>replaceAttr(attrName))
        }else{
            replaceAttr(attr);
        }
    }
    /**
     * Gets public path prefix.  
     * 
     * @param {string} url 
     */
    getDomainFromUrl(url){
        const pattern=/(^.*\..*?\/)\w/i,
            matches=url.match(pattern);
        return matches!==null?matches[1].slice(-1):false;
    }
}
/**
 * Facade function for ImageParser.replaceImageSrc().
 * Replace src path of <img> tags to srcset maximum width path.
 *
 * @since 1.0.3
 * @param {object} frame frame HTML element reference.
 */
export default function removeRelativePath(frame,url){
    const document = frame.contentWindow.document;
    (new RemoveRelativePath(document,url))
        .replace(['link','img']);
}