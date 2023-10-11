import React from 'react';
import PropTypes from 'prop-types';
import config from '@news-parser/config/';
import {document} from 'globals';
/**
 * Image component with lazy load.
 * 
 * @since 0.8.0
 */
export class Image extends React.Component{
    constructor(props){
        super(props)
        this.lazyLoad=this.lazyLoad.bind(this);
        this.imageRef=React.createRef();
    }
    componentDidMount(){
        this.lazyLoad()
    }
    componentDidUpdate(prevProps){
        if(prevProps.src!==this.props.src){
            this.lazyLoad();
        }
    }
    /**
     * Lazy loading
     * 
     * @param {object} item  
     */
    lazyLoad (){
        if(!this.props.src)return;
        const src=this.props.src,
            $this=this,
            image=document.createElement('img');
        image.src=src;
        image.onload=()=>{
            $this.imageRef.current.src=src;
        }
   
    }
    render(){
        const src=this.props.defaultImage||config.defaultImage;
        return (
            <img className={this.props.className||'image-news-parser'} src={src} alt={this.props.alt||''} ref={this.imageRef} />
        )
    }
}


Image.propTypes={
    /**
     * Image source path.
     */
    src:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    /**
     * Image tag class name.
     */
    className:PropTypes.string
}