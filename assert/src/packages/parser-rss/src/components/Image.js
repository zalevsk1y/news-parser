import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component{
    constructor(props){
        super(props)
        this.onLoad=this.onLoad.bind(this);

    }
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
    src:PropTypes.string.isRequired,
    className:PropTypes.string
}