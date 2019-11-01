import React from 'react';
import {Fragment} from 'react';
import Image from '../components/Image';
import {connect} from 'react-redux';
import {parsePage,createMessage,openDialog} from '../actions';
import Icons from '../components/Icons';

import PropTypes from 'prop-types';
import {getNonce} from '@news-parser/helpers'

export class Post extends React.Component {
    constructor(props){
        super(props);
        this.footer=this.footer.bind(this);
        this.openVisualConstructor=this.openVisualConstructor.bind(this);
    }
    footer(props){
        var footer=[],_this=this;
        switch (props.status){
            case 'draft':
                onClickPreviewPage=(event)=>{
                        event.preventDefault();
                        const newWindow=window.open(props.editLink,'_blank');
                        newWindow.focus();
                    }
                footer.push(<Icons className='fo fo-edit' title="Preview created post" onClick={onClickPreviewPage}/>)
                break;
            case 'parsed':
                let onClickParsePage=()=>{
                        props.isFetching?props.message('info','Please wait data is parsing'):props.parsePage(props.link,props.postId)
                    },
                    onClickVisualConstructor=()=>{
                        _this.openVisualConstructor();
                        
                    };
                footer.push(<Icons className='fo fo-download' title="Parse post" onClick={onClickParsePage}/>,
                        <Icons className='fo fo-visual-constructor' title='Visual constructor' onClick={onClickVisualConstructor} />);
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
    openVisualConstructor(){
       
        this.props.openVisualConstructor(this.props.link,{dialog:{
            type:'visualConstructor'
        }})
    }
    render(){
    return (
        <div className={"post-container "+(this.props.status==="draft"?"post-parsed":"")}>
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
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post);

Post.propTypes={
    status:PropTypes.oneOf(['draft','parsed']).isRequired,
    title:PropTypes.string.isRequired,
    image:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    link:PropTypes.string.isRequired,
    pubDate:PropTypes.string.isRequired
}