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
import Sidebar from '@news-parser/sidebar/';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */

class Main extends React.Component {
    constructor(props){
        super(props);
        this.submitButton=this.submitButton.bind(this);
    }
    submitButton(submitType){
        switch (submitType){
            case 'list':
                return {buttonName:"Parse RSS Feed",submitAction:parseList};
            case 'single':
                return {buttonName:"Parse Page",submitAction:parseURL};
        }
    }
    render() {
        return (
            <div className={"wrap"} >
                <VisualConstructor />
                <Sidebar></Sidebar>
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

    }
}


export default connect(mapStateToProps)(Main);


Main.propTypes={
    /**
     * Current app parsing entity [list|single|multi]
     */
    submitType:PropTypes.string 
}