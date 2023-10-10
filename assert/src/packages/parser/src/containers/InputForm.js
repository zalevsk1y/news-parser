import React from 'react';
import {connect} from 'react-redux';
import {parsePage,parseRSSList} from '../actions';
import {getNonce,getUrlWithParams} from '@news-parser/helpers';
import PropTypes from 'prop-types';
import Translate from './Translate';

export class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state={inputValue:props.value||'http://www.'};
        this.inputChange=this.inputChange.bind(this);
        this.handleParsePageSubmit=this.handleParsePageSubmit.bind(this);
        this.handleParseListSubmit=this.handleParseListSubmit.bind(this)
    }
    inputChange(event){
        
        this.setState({inputValue:event.target.value})
    }

    handleParsePageSubmit(event){
        if(this.props.isFetching)return; 
        const nonce=getNonce({page:'parse',action:'get'});
        event.preventDefault();
        this.props.parsePage(nonce,this.state.inputValue)
    }
    handleParseListSubmit(event){
        const params={action:'list',url:this.state.inputValue};
        const url=getUrlWithParams(params)
        window.history.pushState(null,null,url)
        window.location.reload();
    }
    render(){

        return (
            <div className="search container row">

                <div className="row center">
                    <div className="input-wrapper">
                        <input className="search-textbox" type="text" name="url" value={this.state.inputValue} onChange={this.inputChange}></input>
                    </div>
                </div>
                <div className="row center">
                        <button className="main-button parse-rss-button" type="button" onClick={this.handleParseListSubmit}><Translate>Parse RSS Feed</Translate></button>
                        <button className="main-button parse-page-button" type="button" onClick={this.handleParsePageSubmit}><Translate>Parse Page</Translate></button>
                </div>
           
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        value:state.route.url||'',
        isFetching:state.parse.isFetching
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
   
    }

}

export default connect (mapStateToProps,mapDispatchToProps)(InputForm);

InputForm.propTypes={
    parseList:PropTypes.func.isRequired,
    parsePage:PropTypes.func.isRequired,
    value:PropTypes.string
}