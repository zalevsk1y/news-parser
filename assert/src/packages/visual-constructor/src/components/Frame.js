import React from 'react';
import {getPluginDirUrl} from '@news-parser/helpers';
import {selectTitle,selectFeaturedImage} from '../actions';
import {connect} from 'react-redux';
import DOMPurify from 'dompurify';

export class Frame extends React.Component{
    constructor(props){
        super(props);
        this.frameRef=React.createRef();
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
    clickHandler(event){
    
        event.preventDefault();
        const className=event.target.className;
        event.target.className=className.search(' parser-select')===-1?className+' parser-select':className.replace(' parser-select','');
        event.target.getAttribute('src')?console.log(event.target.getAttribute('src')):console.log(event.target.innerHTML)
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
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Frame)