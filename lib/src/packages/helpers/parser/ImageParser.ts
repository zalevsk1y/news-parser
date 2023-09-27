import { ImageParserInterface } from "./types";

/**
 * Class search replace image src with high resolution.
 * 
 * @since 1.0.0
 * 
 * @param {object} HTML document
 */
class ImageParser implements ImageParserInterface{
    protected isLazy:boolean=false;

    constructor(protected doc:Document){
        if(doc===undefined) throw Error('Document argument of ImageParser constructor cannot be undefined.');
    }

    public replaceImageSrc(lazyLoad:boolean):void{
        const img=this.doc.getElementsByTagName('img');
        this.dataSet(Array.from(img));
        this.isLazy=lazyLoad!==undefined?lazyLoad:false;
    }

    protected dataSet(imgElements:Array<HTMLImageElement>):ImageParserInterface{
        [...imgElements].forEach(imgTag=>{
            const imageScr=('src' in imgTag.dataset)?imgTag.dataset.src:null;
            if (imageScr===null||imageScr===undefined) return;
            this.lazyLoad(imgTag,imageScr);
            this.pictureTag(imgTag,imageScr);
        });
        return this;
    }

    protected pictureTag(imgTag:HTMLImageElement,imageSrc:string){
        const parent:HTMLElement|null=imgTag.parentElement;
        if(parent===null) return this;
        const sourceTags=parent.tagName==='PICTURE'&&parent.getElementsByTagName('source');
        if(sourceTags&&sourceTags.length>0)sourceTags[0].srcset=imageSrc;
    }

    // ToDo:add get picture src from wrapping tag.
    protected wrappingATag(imgElements:Array<HTMLImageElement>){
        Array.from(imgElements).forEach(()=>{

        });
    }

    protected lazyLoad(imgElement:HTMLImageElement,src:string):void{
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

export const imageParser=(doc:Document)=>new ImageParser(doc);