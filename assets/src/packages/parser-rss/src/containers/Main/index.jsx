import React from 'react';
import Message from '@news-parser/message/';

import {default as Posts} from '../PostsWithFilters';
import Indicator from '../Indicator';
import {connect} from 'react-redux';
import VisualConstructor from '@news-parser/visual-constructor/';
import PropTypes from 'prop-types';
import {InputForm} from '../InputForm'

import { PostFilterForm } from '../PostFilterForm';
import {PostsSelectedForm} from '../PostsSelectedForm'

/**
 * Main application element.
 * 
 * @since 0.8.0
 */

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state={entity:'main',selectedPosts:0,settingsSidebar:false}
    }
   
    render() {
        return (
            <div className={"wrap wrap-parsing"} >
                <VisualConstructor />
                <div className="parsing-title">
                    <h1>News-Parser</h1>
                </div>
                <Indicator step={0.5}/>
                <Message />
                <div className="search container d-flex flex-column flex-wrap align-content-center justify-content-start">
                    <InputForm />
                    <PostFilterForm />
                    <PostsSelectedForm />
                </div>
                
                <Posts filters={this.state.filters} posts={this.props.posts}/>
                
            </div>
        )
    }
}
Main.defaultProps={
    posts:{
        data:[],
        selected:[],
        draft:[]
    }
}

Main.getDerivedStateFromProps=(props,state)=>{
    const newState={};
    let stateShouldBeChanged=false;
    
    if(props.entity!==state.entity){
        newState.entity=props.entity;
        stateShouldBeChanged=true;
    }
    if(props.posts.length>0){
        const selectedPosts=props.posts.selected.length;
        if(state.selectedPosts!=selectedPosts){
            newState.selectedPosts=selectedPosts
            stateShouldBeChanged=true;
        }
    }
    if(stateShouldBeChanged){
        return {
            ...state,
            ...newState
        }
    }else{
        return null;
    }
}



export default connect()(Main);


Main.propTypes={
    /**
     * Current app parsing entity [list|single|multi]
     */
    entity:PropTypes.string,
    /**
     * Current event, that apply on current app entity [dialog]
     */
    event:PropTypes.string,
    /**
     * RSS data url.
     */
    url:PropTypes.string,
    /**
     * Dialog window state.
     */
    dialog:PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),

  
}