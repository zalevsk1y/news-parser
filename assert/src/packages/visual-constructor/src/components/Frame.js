import React from 'react';
import {getPluginDirUrl,hash} from '@news-parser/helpers';
import {selectTitle,selectFeaturedImage,selectContent,removeContent} from '../actions/frame';
import {connect} from 'react-redux';
import DOMPurify from 'dompurify';


export class Frame extends React.Component{
    constructor(props){
        super(props);
        this.frameRef=React.createRef();
        this.clickHandler=this.clickHandler.bind(this);
    }
    componentDidMount(){
        
        let doc=this.frameRef.current.contentWindow.document,
            sanitizedDOM=DOMPurify.sanitize(this.props.data,{ADD_TAGS:['link'],WHOLE_DOCUMENT:true}),
            cssLink=document.createElement('link');
        this.getTitle();
        this.getFeaturedImage();
      
        cssLink.href = getPluginDirUrl()+"/public/css/frame-style.css"; 
        cssLink.rel = "stylesheet"; 
        cssLink.type = "text/css";
        doc.open();
        doc.write(sanitizedDOM);
        doc.close();
        doc.head.appendChild(cssLink);
        doc.addEventListener('mouseover',this.mouseOver);
        doc.addEventListener('mouseout',this.mouseOut);
        doc.addEventListener('click',this.clickHandler);
        var imgArray=doc.getElementsByTagName('img');
        this.imageLazyLoad(imgArray);
    }
    imageLazyLoad(imgElements){
        [...imgElements].forEach(imgTag=>{
            var imageScr=imgTag.dataset.hasOwnProperty('src')?imgTag.dataset.src:null;
          
            if (imageScr===null) return;
            var lazyLoadImgTag=new Image();
            lazyLoadImgTag.src=imageScr;
            lazyLoadImgTag.onload=function(){
                imgTag.src=this.src;   
            };

        })
    }
    getTitle(){
        const pattern=/\<meta property\=\"og\:title\" content\=\"(.*?)\"/i;
        let title=this.props.data.match(pattern);
        if(title.hasOwnProperty('1')){
            var fixQuotes=title['1'].replace(/\&\#039\;/i,"'");
            this.props.selectTitle(fixQuotes);
        }
       
    }
    getFeaturedImage(){
        const pattern=/\<meta property\=\"og\:image\" content\=\"(.*?)\"/i;
        let image=this.props.data.match(pattern);
       
        if(image.hasOwnProperty('1')){
            
            this.props.selectFeaturedImage(image[1]);
        }
        
    }
    mouseOver(event){
        const className=event.target.className;
        event.target.className=className+' mouse-over';
    }
    mouseOut(event){
        const className=event.target.className;
                event.target.className=className.replace(' mouse-over','');
    }
    parseElementData(element){
        let parentElement=element.parentElement,
            parsedData={};
        parsedData.tagName=element.tagName;
        parsedData.className=element.className.replace(' parser-select','').replace(' mouse-over','');
        parsedData.content=parsedData.tagName==='IMG'?element.src:element.innerText;
        let bodyScrollTop=this.frameRef.current.contentWindow.document.body.scrollTop;
        parsedData.offsetTop=element.getBoundingClientRect().top+bodyScrollTop;
        let parent;
        while(true){
            if(parentElement.className){
                parent={
                    tagName:parentElement.tagName,
                    className:parentElement.className,
                    offsetTop:parentElement.offsetTop
                }
                break;
            }else{
                parentElement=parentElement.parentElement
                if (parentElement.tagName==='BODY'){
                    parent={
                        tagName:'BODY',
                        className:null,
                        offsetTop:parentElement.offsetTop
                    }
                    break;
                }
            }
        }
        parsedData.parent=parent;
        let elementHash=hash((Math.random()).toString());
        element.id=elementHash;
        this.props.selectContent(elementHash,parsedData)

    }
    removeSelectedElement(element){
        const hash=element.id;
        hash&&this.props.removeContent(hash)
    }
    clickHandler(event){
    
        event.preventDefault();
        const className=event.target.className,
              element=event.target;
        if(className.search(' parser-select')===-1){
            element.className=className+' parser-select';
            this.parseElementData(element);
        }else{
            element.className=className.replace(' parser-select','');
            this.removeSelectedElement(element);
        }
       
      
    }
    render(){
       
        return (
            <iframe id='visual-constructor'  frameBorder="0" ref={this.frameRef}  onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.clickHandler}></iframe>
        );
    }
}

function mapStateToProps(state){

    return {
        data:state.parse.dialog.rawHTML
    }
}

function mapDispatchToProps(dispatch){
    return {
        selectTitle:function(title){
            dispatch(selectTitle(title))
        },
        selectFeaturedImage:function(url){
            dispatch(selectFeaturedImage(url));
        },
        selectContent:function(hash,content){
            dispatch(selectContent(hash,content))
        },
        removeContent:function(hash){
            dispatch(removeContent(hash))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Frame)