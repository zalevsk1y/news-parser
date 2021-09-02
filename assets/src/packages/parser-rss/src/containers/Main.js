import React from 'react';
import Message from '@news-parser/message/';
import InputForm from './InputForm';
import Posts from './Posts';
import Indicator from './Indicator';
import {connect} from 'react-redux';
import VisualConstructor from '@news-parser/visual-constructor/';
import {parseList} from '../actions/submit.action';
import {parseURL} from '../actions/submit.action';
import PropTypes from 'prop-types';
import {innerHeight, innerWidth} from 'globals';
import {SidebarMain} from '@news-parser/sidebar/';
import { SUBMIT_TYPE_LIST, SUBMIT_TYPE_PAGE } from '../constants'
import { getWPCategories,getWPTags } from '../actions/wp.api.actions';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */

class Main extends React.Component {
    constructor(props){
        super(props);
        this.submitButton=this.submitButton.bind(this);
        this.state={isSidebarOpen:true}
        this.viewportHeigh=innerHeight;
        this.viewportWidth=innerWidth;
        this.getSidebarData();
    }
    getSidebarData(){
        this.props.getWPCategories();
        this.props.getWPTags();
    }
    submitButton(submitType){
        switch (submitType){
            case SUBMIT_TYPE_LIST:
                return {buttonName:"Parse RSS Feed",submitAction:parseList};
            case SUBMIT_TYPE_PAGE:
                return {buttonName:"Parse Page",submitAction:parseURL};
        }
    }
    handleSidebeStateChange(sidebarConponentState){
        const sidebarState=sidebarConponentState.sidebarState;
        this.setState({isSidebarOpen:sidebarState});
    }
    render() {
       
        return (
            <div className={"wrap"} >
                <VisualConstructor />
                <SidebarMain viewportHeigh={this.viewportHeigh} viewportWidth={this.viewportWidth} entity={this.props.entity} />
                <div className="parsing-title">
                    <h1>News-Parser</h1>
                </div>
                <Indicator step={0.5}/>
                <Message />
                <InputForm {...this.submitButton(this.props.submitType)}/>
                <Posts />
            </div>
        )
    }
}

function mapStateToProps(state){
    
    return {
        submitType:state.parse.appState.submitType,
        entity:state.parse.appState.entity,
        categories:state.parse.sidebar.categories

    }
}
function mapDispatchToProps(dispatch) {
    return {
        getWPCategories:()=>{
            dispatch(getWPCategories())
        },
        getWPTags:()=>{
            dispatch(getWPTags())
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);


Main.propTypes={
    /**
     * Current app parsing entity [list|single|multi]
     */
    submitType:PropTypes.string ,
     /**
     * Current app parsing entity parser-rss-[list|page|media]
     */
    entity:PropTypes.string 
}