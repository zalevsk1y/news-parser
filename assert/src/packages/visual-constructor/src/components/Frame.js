import React from 'react';
import {getPluginDirUrl} from '@news-parser/helpers';
import {Parser} from '@news-parser/helpers/classes/Parser'
import {selectTitle,selectFeaturedMedia,selectContent,removeContent} from '../actions/frame';
import {connect} from 'react-redux';
import DOMPurify from 'dompurify';


export class Frame extends React.Component{
    constructor(props){
        super(props);
        this.frameRef=React.createRef();
        this.clickHandler=this.clickHandler.bind(this);
    }
    componentDidMount(){
        let DOMData=this.replaceYouTubeFrames(this.props.data),
            doc=this.frameRef.current.contentWindow.document,
            sanitizedDOM=DOMPurify.sanitize(DOMData,{ADD_TAGS:['link'],WHOLE_DOCUMENT:true}),
            cssLink=document.createElement('link');
        this.getTitle();
        this.getFeaturedMedia();
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
        this.parser=new Parser(this.frameRef);
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
    replaceYouTubeFrames(dom){
        let hashPattern=/\<iframe.*?src\=[\"\'].*?youtube\.com\/embed\/(.*?)[?\"\'].*?<\/iframe>/g,
            replacement='<video class="news-parser-youtube" poster='+getPluginDirUrl()+"/public/images/youtube-video.jpeg"+' data-hash="$1">',
            newDom=dom.replace(hashPattern,replacement);
            return newDom;

    }
    getTitle(){
        const pattern=/\<meta property\=\"og\:title\" content\=\"(.*?)\"/i;
        let title=this.props.data.match(pattern);
        if(title.hasOwnProperty('1')){
            var fixQuotes=title['1'].replace(/\&\#039\;/i,"'");
            this.props.selectTitle(fixQuotes);
        }
       
    }
    getFeaturedMedia(){
        const pattern=/\<meta property\=\"og\:image\" content\=\"(.*?)\"/i;
        let image=this.props.data.match(pattern);
       
        if(image.hasOwnProperty('1')){
            
            this.props.selectFeaturedMedia(image[1]);
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
        let {elementHash,parsedData}=this.parser.parseElementData(element)
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
        selectFeaturedMedia:function(url){
            dispatch(selectFeaturedMedia(url));
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