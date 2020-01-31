import React from 'react';
import {getPluginDirUrl} from '@news-parser/helpers';
import {Parser} from '@news-parser/helpers/classes/Parser'
import {selectTitle,selectFeaturedMedia,selectContent,removeContent} from '../actions/frame.actions';
import {connect} from 'react-redux';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

/**
 * Frame element of visual constructor modal window. Allow choose parsing content manually.
 * 
 * @since 1.0.0
 */
export class Frame extends React.Component{
    constructor(props){
        super(props);
        this.frameRef=React.createRef();
        this.clickHandler=this.clickHandler.bind(this);
    }
    /**
     * Write sanitized page html into iframe.
     */
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
    /**
     * Check if img tags have lazy load data-src attributes and set them to src.
     * 
     * @param {object} imgElements  HTMLCollection of img elements.
     */
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
    /**
     * Find and replace YouTube frames? replacing with video tag that contains data-hash attr with youtube hash data.
     * 
     * @param {string} dom 
     */
    replaceYouTubeFrames(dom){
        let hashPattern=/\<iframe.*?src\=[\"\'].*?youtube\.com\/embed\/(.*?)[?\"\'].*?<\/iframe>/g,
            replacement='<video class="news-parser-youtube" poster='+getPluginDirUrl()+"/public/images/youtube-video.jpeg"+' data-hash="$1">',
            newDom=dom.replace(hashPattern,replacement);
            return newDom;

    }
    /**
     * Get post title using Open Graph protocol.
     */
    getTitle(){
        const pattern=/\<meta property\=\"og\:title\" content\=\"(.*?)\"/i;
        let title=this.props.data.match(pattern);
        if(title.hasOwnProperty('1')){
            var fixQuotes=title['1'].replace(/\&\#039\;/i,"'");
            this.props.selectTitle(fixQuotes);
        }
       
    }
    /**
     * Get post featured media using Open Graph protocol.
     */
    getFeaturedMedia(){
        const pattern=/\<meta property\=\"og\:image\" content\=\"(.*?)\"/i;
        let image=this.props.data.match(pattern);
       
        if(image.hasOwnProperty('1')){
            
            this.props.selectFeaturedMedia(image[1]);
        }
        
    }
    /**
     * Event listener callback to highlight html elements when mouse is over them.
     * 
     * @param {object} event 
     */
    mouseOver(event){
        const className=event.target.className;
        event.target.className=className+' mouse-over';
    }
    /**
     * Event listener callback to stop highlight html elements when mouse is left them.
     * 
     * @param {object} event 
     */
    mouseOut(event){
        const className=event.target.className;
                event.target.className=className.replace(' mouse-over','');
    }
    /**
     * Parse data from HTML element.
     * 
     * @param {object} element HTMLElement.
     */
    parseElementData(element){
        let {elementHash,parsedData}=this.parser.parseElementData(element)
        element.id=elementHash;
        this.props.selectContent(elementHash,parsedData)
    }
    /**
     * Remove parsed element data. 
     * 
     * @param {object} element HTMLElement. 
     */
    removeSelectedElement(element){
        const hash=element.id;
        hash&&this.props.removeContent(hash)
    }
    /**
     * Select element on click.
     * 
     * @param {object} event Event object
     */
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

Frame.propTypes={
    /**
     * HTML data that should be write to the iFrame.
     */
    data:PropTypes.string.isRequired,
    /**
     * Select title action.Set post title.
     * 
     * @param {string} title Post title.
     */
    selectTitle:PropTypes.func.isRequired,
    /**
     * Select post featured image action.
     * 
     * @param {string} url Image url.
     */
    selectFeaturedMedia:PropTypes.func.isRequired,
    /**
     * Select post content action.
     * 
     * @param {string} hash Element hash used as key in data storage.
     * @param {string} content Element content.
     */
    selectContent:PropTypes.func.isRequired,
    /**
     * Remove selected content action.
     * 
     * @param {string} hash Content key.
     */
    removeContent:PropTypes.func.isRequired
}