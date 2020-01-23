import React from 'react';
import PropTypes from 'prop-types';
/**
 * Image component with lazy load.
 * 
 * @since 0.8.0
 */
class Image extends React.Component{
    constructor(props){
        super(props)
        this.onLoad=this.onLoad.bind(this);
    }
    /**
     * Lazy loading
     * 
     * @param {object} item  
     */
    onLoad (item){
        var src=this.props.src,
            el=item.target,
            image=new Image();
            image.src=src;
            image.onload=()=>{
                el.src=src;
            }
   
    }
    render(){
        return (
            <img className={this.props.className||'image-news-parser'} src={this.props.src} alt='' />
        )
    }
}
export default Image;

Image.propTypes={
    /**
     * Image source path.
     */
    src:PropTypes.string.isRequired,
    /**
     * Image tag class name.
     */
    className:PropTypes.string
}