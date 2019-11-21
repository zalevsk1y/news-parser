import React from 'react';
import {connect} from 'react-redux';
import {parsePage,parseRSSList,openDialog,parseSelected,createMessage} from '../actions'; 
import {getUrlWithParams} from '@news-parser/helpers';
import PropTypes from 'prop-types';
import Translate from './Translate';


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
    inputChange(event){
        
        this.setState({inputValue:event.target.value})
    }

    handleParsePageSubmit(event){
        event.preventDefault();
        if(this.props.isFetching)return; 
        this.props.openVisualConstructor(this.state.inputValue,{dialog:{
            postId:undefined,
            type:'visualConstructor'
        }})
    }
    handleParseListSubmit(event){
        const params={action:'list',url:this.state.inputValue};
        const url=getUrlWithParams(params)
        window.history.pushState(null,null,url)
        window.location.reload();
    }
    handleParseSelected(){
        if (!this.props.posts){
            this.props.createMessage('info','Please select RSS feed first.');
            return;
        }
        const selectedPosts=this.props.posts.filter(post=>{
            return post.status==='selected';
        });
        if (selectedPosts.length===0){
            this.props.createMessage('info','Please select posts.');
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
        parseList:(nonce,url)=>{
            dispatch(parseRSSList({dispatch,nonce,url}))
        },
        parsePage:(nonce,url)=>{
            dispatch(parsePage({dispatch,nonce,url}));
        },
        openVisualConstructor:(url,dialogData)=>{
            dispatch(openDialog(url,dialogData))
        },
        parseSelected:(posts)=>{
            dispatch(parseSelected(posts,dispatch))
        },
        createMessage:(type,text)=>{
            dispatch(createMessage(type,text))
        }
    }

}

export default connect (mapStateToProps,mapDispatchToProps)(InputForm);

InputForm.propTypes={
    parseList:PropTypes.func.isRequired,
    parsePage:PropTypes.func.isRequired,
    value:PropTypes.string
}