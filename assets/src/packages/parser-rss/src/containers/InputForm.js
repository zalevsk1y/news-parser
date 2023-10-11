import React from 'react';
import {connect} from 'react-redux';
import {openDialog} from '../actions/app.actions'; 
import {fetchList} from '../actions/list.actions';
import {encodeUrlWithParams} from '@news-parser/helpers';
import {LIST} from '../constants';
import {VISUAL_CONSTRUCTOR} from '@news-parser/visual-constructor/constants/'
import PropTypes from 'prop-types';
import {parseSelected} from '../actions/page.actions';
import {showMessage} from '@news-parser/message/'
import {location} from 'globals';

/**
 * Input element with submit buttons.
 * 
 * @since 0.8.0
 */
export class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state={inputValue:props.value||'https://www.'};
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
        if(!this.state.inputValue){
            this.props.showMessage('info','Please input page URL.');        
            return;                                                                                                                                                                                                                                                                                                     
        } 
        this.props.openVisualConstructor(this.state.inputValue)
    }
    /**
     * Handles parse RSS posts list submit. 
     * 
     * @param {object} event Click event object.  
     */
    handleParseListSubmit(event){
        const params={entity:LIST,url:this.state.inputValue},                                                                                                                                                                           
            url=encodeUrlWithParams(params)
        location.assign(url);
    }
    /**
     * Handles parse multiple selected from RSS list posts submit. 
     * 
     * @param {object} event Click event object. 
     */
    handleParseSelected(event){
        if(this.props.isFetching){                                                                                                                                                                                                                                                                                                                                                                                                      
            this.props.showMessage('info','Application in process of parsing.Please be patient.');
            return;
        } 
        this.props.parseSelected()
    }
    renderButtons(){
        switch(this.props.page){
            case 'news-parser-main-menu':
                return (
                        <div className='row center mt-10'>
                            <button className="main-button parse-rss-button" type="button" onClick={this.handleParseListSubmit}>Parse RSS Feed</button>
                            <button className="main-button parse-selected-button" type="button" onClick={this.handleParseSelected}>Parse Selected</button>
                        </div>
                )
            case 'news-parser-menu-parse-page':
                return (
                    <>
                        <button className="main-button parse-page-button" type="button" onClick={this.handleParsePageSubmit}>Parse Page</button>
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
    return {
        page:state.route.page,
        value:state.parse.appState.data.url||'',
        isFetching:state.parse.isFetching
    }
}
function mapDispatchToProps(dispatch){
    return {
        parseList:(url)=>{
            dispatch(fetchList(url))
        },
        openVisualConstructor:(url)=>{
            dispatch(openDialog(0,url,VISUAL_CONSTRUCTOR))
        },
        parseSelected:()=>{
            dispatch(parseSelected())
        },
        showMessage:(type,text)=>{
            dispatch(showMessage(type,text))
        }
    }

}

export default connect (mapStateToProps,mapDispatchToProps)(InputForm);

InputForm. propTypes={
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
     * Action handles parsing RSS list
     * 
     * @param {string} url Url of RSS file.
     */
    parseList:PropTypes.func.isRequired,
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
     */
    parseSelected:PropTypes.func.isRequired,
    /**
     * Show message.
     * 
     * @param {string} type Type of the massage [info|error|success]
     * @param {string} text Text of the message.
     */
    showMessage:PropTypes.func.isRequired


}