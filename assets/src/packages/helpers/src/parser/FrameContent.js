import Purify from "dompurify";

export class FrameContent {
    constructor(DOMData,url){
        if(DOMData===undefined) throw Error('HTML document string argument could not be undefined.');
        if(url===undefined) throw Error('url argument could not be undefined.');
        this.dom=DOMData;
        this.url=url;
    }
    addModifiersHTMLString(arrayOfModifierNames){
        const arrayOfModifiers=this.createArrayOfModifiers(arrayOfModifierNames);
        this.sanitizedDOM=arrayOfModifiers.reduce((accData,modifier)=>modifier.call(this,accData),this.dom)
    }
    addModifiersFrameDocument(arrayOfModifiers){
        if (!this.hasOwnProperty('frame')) throw Error ('Frame element is not set');
        const arrayOfModifiers=this.createArrayOfModifiers(arrayOfModifierNames),
            frame=this.frame;
        arrayOfModifiers.forEach(modifier=>modifier.call(this,frame));
    }
    injectHTMLIntoFrame(frame){
        if (!this.hasOwnProperty('sanitizedDOM')) throw Error ('Sanitize HTML data before injection');
        const document=contentWindow.document;
        document.open();
        document.write(sanitizedDOM);
        document.close();
        this.frame=frame;
    }
    createArrayOfModifiers(arrayOfModifierNames){
        return arrayOfModifierNames.map(propName=>{
            if(!this.hasOwnProperty(propName)) throw Error(`No method in class FrameContent with name ${propName}`);
            return this[propName];
        })
    }
    replaceRelativePath(){
        const domain=this.getDomain(this.url),
            tagNameArray=['link','img'];
        tagNameArray.forEach(tagName=>{
            const tagsList=this.doc.getElementsByTagName(tagName);
            tagsList.forEach(el=>{
                const attrName=tagName==='link'?'href':'src';
                this.replacePath(el,attrName,publicPathPrefix);
            })
        })
    }
    replacePath(el,attr,publicPathPrefix){
        const relativePath=el.getAttribute(attr);
        if(relativePath.indexOf('/')!==0) return false;
        el.setAttribute(attr,publicPathPrefix+relativePath)
    }
    injectCSS(options){
        if (!this.hasOwnProperty('frame')) throw Error ('Frame element is not set');
        switch (options.tag){
            case 'link':
                cssLink = document.createElement("link");
                cssLink.href = getPluginDirUrl() + "/public/css/frame-style.css";
                cssLink.rel = "stylesheet";
                cssLink.type = "text/css";
            }
        doc[options.parent].appendChild(cssLink);
    }
    DOMPurify(){
        return Purify.sanitize(DOMData, {
            ADD_TAGS: ["link","meta"],
            ADD_ATTR:["property","content"],
            WHOLE_DOCUMENT: true,
            ALLOW_UNKNOWN_PROTOCOLS:true
          })
    }
    getDomain(url){
        const pattern=/(^.*\..*?\/)\w/i,
            matches=url.match(pattern);
        return matches!==null?matches[1].slice(-1):false;
    }
}