import React from 'react';
import {Fragment} from 'react';
import Image from '../components/Image';
import {connect} from 'react-redux';
import {parsePage,createMessage,openDialog,selectPost} from '../actions';
import Icons from '../components/Icons';

import PropTypes from 'prop-types';
import {getNonce} from '@news-parser/helpers'

export class Post extends React.Component {
    constructor(props){
        super(props);
        this.footer=this.footer.bind(this);
        this.openVisualConstructor=this.openVisualConstructor.bind(this);
        this.selectPost=this.selectPost.bind(this);
    }
    footer(props){
        var footer=[],_this=this;
        switch (props.status){
            case 'draft':
                let onClickEditPost=(event)=>{
                        event.preventDefault();
                        const newWindow=window.open(props.editLink,'_blank');
                        newWindow.focus();
                    }
                footer.push(<Icons className='fo fo-edit' title="Edit post" onClick={onClickEditPost}/>)
                break;
            case 'selected':
            case 'parsed':
                footer.push(<Icons className={'fo fo-select'+(props.status==='selected'?' icon-selected':'')} title={props.status==='selected'?'Unselect post':'Select post'} onClick={this.selectPost}/>,
                        <Icons className='fo fo-visual-constructor' title='Visual constructor' onClick={this.openVisualConstructor} />);
                break;
            default:
                console.error('Wrong post type: '+props.status)
        }
        return (
            <div className="footer-post">
                {footer.map((icon,key)=><Fragment key={key.toString()}>{icon}</Fragment>)}
            </div>
        )
    }
    selectPost(){
        this.props.selectPost(this.props._id)
    }
    openVisualConstructor(){
        this.props.openVisualConstructor(this.props.link,{dialog:{
            postId:this.props.postId,
            type:'visualConstructor'
        }})
    }
    render(){
    return (
        <div className={"post-container "+((this.props.status==="draft"||this.props.status==="selected")?"highlight":"")}>
            <div className="post-time">
                <span className="fo fo-clock"></span>
                <span className="post-time-header">{this.props.pubDate}</span>
            </div>
            <div className="post-image-wrapper">
                <a
                    className="img-post-link"
                    href={this.props.link}>
                    <Image
                        className="post-image"
                      
                        src={this.props.image}
                        />
                </a>
                </div>
                {
                    //<!--post-image-wrapper -->
                }
                <div className="post-content">
                    <div className="post-title-wrapper">
                        <a
                            className="title-post-link"
                            href={this.props.link}>
                            <span className="post-title">{this.props.title}</span>
                        </a>
                    </div>
                    {
                        //<!--post-title-wrapper -->
                    }
                    <div className="post-description">
                        <span>{this.props.description}</span>
                    </div>
                </div>
                <this.footer {...this.props}/>
                {
                    //<!-- post-content -->
                }
                
            </div>
    )}
}
function mapStateToProps(state,props){
    return {
        isFetching:state.parse.isFetching,
        status:state.parse.items.data[props._id].status,
        editLink:state.parse.items.data[props._id].editLink
    }
}
function mapDispatchToProps(dispatch){
    return {
        parsePage:(url,id)=>{
            const nonce=getNonce({page:'parse',action:'get'})
            dispatch(parsePage({dispatch,nonce,url,id}))
        },
        message:(type,text)=>{
            dispatch(createMessage(type,text))
        },
        openVisualConstructor:(url,dialogData)=>{
            dispatch(openDialog(url,dialogData))
        },
        selectPost:(_id)=>{
            dispatch(selectPost(_id))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post);

Post.propTypes={
    status:PropTypes.oneOf(['draft','parsed','selected']).isRequired,
    title:PropTypes.string.isRequired,
    image:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    link:PropTypes.string.isRequired,
    pubDate:PropTypes.string.isRequired
}