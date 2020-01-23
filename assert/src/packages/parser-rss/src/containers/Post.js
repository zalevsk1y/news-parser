import React from 'react';
import {Fragment} from 'react';
import Image from '../components/Image';
import {connect} from 'react-redux';
import {parsePage,createMessage,openDialog,selectPost} from '../actions';
import Icons from '../components/Icons';
import PropTypes from 'prop-types';


/**
 * Post box component.
 * 
 * @since 0.8.0
 */
export class Post extends React.Component {
    constructor(props){
        super(props);
        this.footer=this.footer.bind(this);
        this.openVisualConstructor=this.openVisualConstructor.bind(this);
        this.selectPost=this.selectPost.bind(this);
    }
    /**
     * Footer of post box.
     * 
     * @param {object} props 
     */
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
    /**
     * Post select handler.
     */
    selectPost(){
        this.props.selectPost(this.props._id)
    }
    /**
     * Open visual constructor modal window. 
     */
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
            dispatch(parsePage(dispatch,url,id))
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
    /**
     * Fetching state.
     */
    isFetching:PropTypes.bool,
    /**
     *  Post status. 
     */
    status:PropTypes.oneOf(['draft','parsed','selected']).isRequired,
    /**
     * Post title.
     */
    title:PropTypes.string.isRequired,
    /**
     * Post image.
     */
    image:PropTypes.string.isRequired,
    /**
     * Post description.
     */
    description:PropTypes.string.isRequired,
    /**
     * Link to the source.
     */
    link:PropTypes.string.isRequired,
    /**
     * Date pf post publication.
     */
    pubDate:PropTypes.string.isRequired,
    /**
     * Link to the wordpress post editor.
     */
    editLink:PropTypes.string,
    /**
     * Action handles parse single page.
     * 
     * @param {string} url Url of the page.
     * @param {string} innerPostIndex Index of the post in array(optional).
     */
    parsePage:PropTypes.func.isRequired,
    /**
     * Show message.
     * 
     * @param {string} type Type of the massage [info|error|success]
     * @param {string} text Text of the message.
     */
    message:PropTypes.func.isRequired,
    /**
     * Open visual constructor modal window to select content manually 
     * or create p[arsing template rules. 
     * 
     * @param {string} url url of the page.
     */
    openVisualConstructor:PropTypes.func.isRequired,
    /**
     * Select post action.
     * 
     * @param {string} _id inner array index (not wordpress post_id)
     */
    selectPost:PropTypes.func.isRequired
}