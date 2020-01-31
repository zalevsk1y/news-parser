import React from 'react';
import {connect} from 'react-redux';
import {parsePage,parseRSSList,openDialog,parseSelected,showMessage} from '../actions'; 
import {fetchList} from '../actions/list.actions';
import {getUrlWithParams} from '@news-parser/helpers';
import PropTypes from 'prop-types';
import Translate from './Translate';

/**
 * Input element with submit buttons.
 * 
 * @since 0.8.0
 */
export class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state={inputValue:props.value||'http://www.'};
        this.inputChange=this.inputChange.bind(this);
        this.handleParsePageSubmit=this.handleParsePageSubmit.bind(this);
        this.handleParseListSubmit=this.handleParseListSubmit.bind(this);
        this.handleParseSelected=this.handleParseSelected.bind(this);
        this.renderButtons=this.renderButtons.bind(this);
    }
    /**
     * Change state of component on input.
     * 
     * @param {object} event Change event object.
     */
    inputChange(event){
        this.setState({inputValue:event.target.value})
    }
    /**
     * Handles parse single page submit.
     * 
     * @param {object} event Click event object. 
     */
    handleParsePageSubmit(event){
        event.preventDefault();
        if(this.props.isFetching)return; 
        this.props.openVisualConstructor(this.state.inputValue,{dialog:{
            postId:undefined,
            type:'visualConstructor'
        }})
    }
    /**
     * Handles parse RSS posts list submit. 
     * 
     * @param {object} event Click event object.  
     */
    handleParseListSubmit(event){
        event.preventDefault();
        const params={action:'list',url:this.state.inputValue};
        const url=getUrlWithParams(params)
        window.history.pushState(null,null,url)
        window.location.reload();
    }
    /**
     * Handles parse multiple selected from RSS list posts submit. 
     * 
     * @param {object} event Click event object. 
     */
    handleParseSelected(event){
        event.preventDefault();
        if (!this.props.posts){
            this.props.message('info','Please select RSS feed first.');
            return;
        }
        const selectedPosts=this.props.posts.filter(post=>{
            return post.status==='selected';
        });
        if (selectedPosts.length===0){
            this.props.message('info','Please select posts.');
            return;
        }
        this.props.parseSelected(selectedPosts)
    }
    renderButtons(){
        switch(this.props.page){
            case 'news-parser-main-menu':
                return (
                        <div className='row center mt-10'>
                            <button className="main-button parse-rss-button" type="button" onClick={this.handleParseListSubmit}><Translate>Parse RSS Feed</Translate></button>
                            <button className="main-button parse-selected-button" type="button" onClick={this.handleParseSelected}><Translate>Parse Selected</Translate></button>
                        </div>
                )
            case 'news-parser-menu-parse-page':
                return (
                    <>
                        <button className="main-button parse-page-button" type="button" onClick={this.handleParsePageSubmit}><Translate>Parse Page</Translate></button>
                    </>
                )
            default:
                return (
                    <></>
                )
        }   
    }
    render(){

        return (
            <div className="search container row">

                <div className="row center">
                    <div className="input-wrapper">
                        <input className="search-textbox" type="text" name="url" value={this.state.inputValue} onChange={this.inputChange}></input>
                        <this.renderButtons />
                    </div>
                </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    const posts=state.parse.items.hasOwnProperty('data')?state.parse.items.data:[];
    return {
        value:state.route.url||'',
        page:state.route.page,
        isFetching:state.parse.isFetching,
        posts
    }
}
function mapDispatchToProps(dispatch){
    return {
        parseList:(url)=>{
            dispatch(fetchList(url))
        },
        parsePage:(url)=>{
            dispatch(parsePage(dispatch,url));
        },
        openVisualConstructor:(url,dialogData)=>{
            dispatch(openDialog(url,dialogData))
        },
        parseSelected:(posts)=>{
            dispatch(parseSelected(dispatch,posts))
        },
        message:(type,text)=>{
            dispatch(showMessage(type,text))
        }
    }

}

export default connect (mapStateToProps,mapDispatchToProps)(InputForm);

InputForm. propTypes={
    /**
     * Action handles parsing RSS list
     * 
     * @param {string} url Url of RSS file.
     */
    parseList:PropTypes.func.isRequired,
    /**
     * Action handles parse single page.
     * 
     * @param {string} url Url of the page.
     * @param {string} innerPostIndex Index of the post in array(optional).
     */
    parsePage:PropTypes.func.isRequired,
    /**
     * Open visual constructor modal window to select content manually 
     * or create p[arsing template rules. 
     * 
     * @param {string} url url of the page.
     */
    openVisualConstructor:PropTypes.func.isRequired,
    /**
     * Parse selected post from RSS list and create drafts.
     * 
     * @param {array} posts Array of selected posts.
     */
    parseSelected:PropTypes.func.isRequired,
    /**
     * Show message.
     * 
     * @param {string} type Type of the massage [info|error|success]
     * @param {string} text Text of the message.
     */
    message:PropTypes.func.isRequired,
    /**
     * Input element value. 
     */
    value:PropTypes.string,
    /**
     * Menu page.
     */
    page:PropTypes.string,
    /**
     * Fetching state.
     */
    isFetching:PropTypes.bool,
    /**
     * Selected from RSS list posts.
     */
    posts:PropTypes.array
}