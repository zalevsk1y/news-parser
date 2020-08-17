import React from 'react';
import {connect} from 'react-redux';
import {openDialog} from '../../actions/app.actions'; 
import {fetchList} from '../../actions/list.actions';
import {encodeUrlWithParams} from '@news-parser/helpers';
import {LIST} from '../../constants';
import {VISUAL_CONSTRUCTOR} from '@news-parser/visual-constructor/constants/'
import PropTypes from 'prop-types';
import {parseSelected} from '../../actions/page.actions';
import {showMessage} from '@news-parser/message/'
import Switch from '../../components/Switch'
import {location} from 'globals';
import {SettingsBox} from '../../components/SettingsBox'
import {SettingsGrid} from '../../components/SettingsGrid';
import {SettingsItem} from '../../components/SettingsItem'
import {SettingTitle} from '../../components/SettingTitle';
import {SettingValue} from '../../components/SettingValue';
import {SettingsSubmitButton} from '../../components/SettingsSubmitButton'

import './input-form.scss';
/**
 * Input element with submit buttons.
 * 
 * @since 0.8.0
 */
export class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state={inputValue:props.value||'',type:'rss'};
        this.inputChangeHandler=this.inputChangeHandler.bind(this);
        this.typeChangeHandler=this.typeChangeHandler.bind(this);
        this.parseSubmitHandler=this.parseSubmitHandler.bind(this);
    }
    /**
     * Change state of component on input.
     * 
     * @param {object} event Change event object.
     */
    inputChangeHandler(event){
        this.setState({inputValue:event.target.value})
    }
    typeChangeHandler(){
        const newState=this.state.type==='rss'?'html':'rss';
        this.setState({type:newState});
        console.log(newState);
    }
    /**
     * Handles parse submit. 
     * 
     * 
     */
    parseSubmitHandler(){
        if(!this.validateInputUrl(this.state.inputValue)){
            this.props.showMessage('info','Please, input valid url address');
            return;
        } 
        switch (this.state.type){
            case 'rss':
                const url=encodeUrlWithParams({entity:LIST,url:this.state.inputValue});
                location.assign(url);
                break;
            case 'html':
                this.props.openVisualConstructor(this.state.inputValue);
        }
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
    /**
     * Validate input url string.
     * 
     * @param {string} url 
     */
    validateInputUrl(url){
        return (url.search(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)!==-1)
    }
    
    render(){

        return (
            
            <SettingsBox>
                <SettingsGrid>
                    <SettingsItem>
                        <SettingTitle>Parse</SettingTitle>
                        <SettingValue>
                            <div className='selector-container d-flex flex-row'>
                                <div className="search-type-text flex-grow-1">
                                    {this.state.type==='rss'?'RSS source':'Single page'}
                                </div>
                                <div className='switch-container' >
                                    <Switch state={this.state.type==='rss'?true:false} onClick={this.typeChangeHandler}/>
                                </div>
                            </div>
                        </SettingValue>
                        </SettingsItem>
                            <SettingsItem>
                                <SettingTitle>Url</SettingTitle>
                                <SettingValue>
                                    <input className="parse-url-input" type="url" onBlur={this.inputChangeHandler} />
                                </SettingValue>
                        </SettingsItem>
                    </SettingsGrid>
                <SettingsSubmitButton>
                    <button className='button-main' onClick={this.parseSubmitHandler}>Get</button> 
                </SettingsSubmitButton>
            </SettingsBox>
                
            
        
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