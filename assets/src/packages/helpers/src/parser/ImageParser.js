
class ImageParser{
    constructor(dom){
        this.dom=dom;
    }
    replaceImageSrc(){
        const img=this.dom.getElementsByTagName('img');
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
        debugger;
        const parent=imgTag.parentElement,
            sourceTags=parent.tagName==='PICTURE'&&parent.getElementsByTagName('source');
            if(sourceTags.length>0)sourceTags[0].srcset=imageScr;
    }
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

export const imageParser=dom=>new ImageParser(dom);