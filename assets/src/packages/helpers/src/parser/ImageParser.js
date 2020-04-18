/**
 * Class search replace image src with high resolution.a1
 * 
 * @since 1.0.0
 * 
 * @param {object} HTML document
 */
class ImageParser{
    constructor(document){
        if(document===undefined) throw Error('Document argument of ImageParcer constructor cannot be undefined.')
        this.doc=document;
    }
    replaceImageSrc(){
        const img=this.doc.getElementsByTagName('img');
        this.dataSet(img);
    }
    dataSet(imgElements){
        const $this=this;
        [...imgElements].forEach(imgTag=>{
            let imageScr=imgTag.dataset.hasOwnProperty('src')?imgTag.dataset.src:null;
            if (imageScr===null) return;
            $this.lazyLoad(imgTag,imageScr);
            $this.pictureTag(imgTag,imageScr);
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
        const lazyLoadImgTag=new Image();
            lazyLoadImgTag.src=src;
            lazyLoadImgTag.onload=function(){
                imgElement.src=this.src;   
            };
    }

}

export const imageParser=documnet=>new ImageParser(document);