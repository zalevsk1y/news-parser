import { lazy } from "react";

/**
 * Class search replace image src with high resolution.
 * 
 * @since 1.0.0
 * 
 * @param {object} HTML document
 */
class ImageParser{
    constructor(doc){
        if(doc===undefined) throw Error('Document argument of ImageParser constructor cannot be undefined.')
        this.doc=doc;
    }
    replaceImageSrc(lazyLoad){
        const img=this.doc.getElementsByTagName('img');
        this.dataSet(img);
        this.isLazy=lazyLoad!==undefined?lazyLoad:false;
    }
    dataSet(imgElements){
        [...imgElements].forEach(imgTag=>{
            let imageScr=imgTag.dataset.hasOwnProperty('src')?imgTag.dataset.src:null;
            if (imageScr===null) return;
            this.lazyLoad(imgTag,imageScr);
            this.pictureTag(imgTag,imageScr);
        });
        return this;
    }
    pictureTag(imgTag,imageScr){
        const parent=imgTag.parentElement,
            sourceTags=parent.tagName==='PICTURE'&&parent.getElementsByTagName('source');
            if(sourceTags.length>0)sourceTags[0].srcset=imageScr;
    }
    //ToDo:add get picture src from wrapping tag.
    wrappingATag(imgElements){
        [...imgElements].forEach(imgTag=>{

        });
    }
    lazyLoad(imgElement,src){
        if(!this.isLazy){
            imgElement.src=src; 
            return;
        }
        const lazyLoadImgTag=new Image();
            lazyLoadImgTag.src=src;
            lazyLoadImgTag.onload=function(){
                imgElement.src=src;   
            };
    }

}

export const imageParser=doc=>new ImageParser(doc);