import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectPicture, focusPicture, deselectPicture,updatePictureInfo} from '../actions';
import config from '@news-parser/config';

export class Picture extends React.Component{
    constructor(props){
        super(props);
        this.onClick=this.onClick.bind(this);
        this.deselect=this.deselect.bind(this);
        this.state={url:config.defaultImage};
        this.lazyLoad.call(this);
    }
    getFileNameFromUrl(url){
        var urlArray=url.split("/");
        return urlArray[urlArray.length-1]
    }
    onClick(){
        !this.props.select&&this.props.selectItem(this.props.id);
        this.props.focusItem(this.props.id)
    }
    deselect(){
        this.props.deselectItem(this.props.id);
    }
    lazyLoad(){
        const img=new Image();
        img.src=this.props.url;
        img.onload=function(){
            this.props.updatePictureInfo(this.props.id,{name:this.getFileNameFromUrl(this.props.url),height:parseInt(img.naturalHeight),width:parseInt(img.naturalWidth)});
            this.setState({url:this.props.url});
        }.bind(this);
    }
    render(){
        const selected=this.props.select?' selected':'',
              focus=this.props.focus?' details':'';
        return (
            <li aria-label="image"  className={"attachment save-ready"+selected+focus} onClick={this.onClick}>
                <div className="attachment-preview js--select-attachment type-image subtype-jpeg landscape">
                    <div className="thumbnail">
                         <div className="centered">
                            <img src={this.state.url} draggable="false" alt=""/>
                        </div>
                    </div> 
                </div>
                <button type="button" className="check" tabindex={selected?0:-1} onClick={this.deselect}>
                    <span className="media-modal-icon"></span>
                    <span className="screen-reader-text">Deselect</span>
                </button>
            </li>
        )
    }
} 

function mapStateToProps(state,props){
    const item=state.parse.dialog.data[props.id];
    return {...item}
}
function mapDispatchToProps(dispatch){
    return {
        selectItem:(id)=>{
            dispatch(selectPicture(id))
        },
        focusItem:(id)=>{
            dispatch(focusPicture(id));
        },
        deselectItem:(id)=>{
            dispatch(deselectPicture(id));
        },
        updatePictureInfo:(id,info)=>{
            dispatch(updatePictureInfo(id,info));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Picture)