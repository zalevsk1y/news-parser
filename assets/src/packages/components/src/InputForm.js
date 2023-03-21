import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showMessage } from '../actions/app.actions';


/**
 * Input element with submit buttons.
 * 
 * @since 0.8.0
 */
export class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state={inputValue:props.value||''};
        this.inputChange=this.inputChange.bind(this);
        this.submitClickHandler=this.submitClickHandler.bind(this);
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
     * Validate input url string.
     * 
     * @param {string} url 
     */
    validateIntupUrl(url){
        return (url.search(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)!==-1)
    }
    submitClickHandler(){
        if (!this.validateIntupUrl(this.state.inputValue)){
            this.props.showMessage('info','Please enter valid url.');
            return;
        }
        this.props.submitAction(this.state.inputValue)
    }
    render(){
        return (
            <div className="search container row">

                <div className="row center">
                    <div className="input-wrapper">
                        <input className="search-textbox" type="url" minLength={10} required name="url" placeholder="https://" value={this.state.inputValue} onChange={this.inputChange}></input>
                        <button className="main-button parse-rss-button" type="button" onClick={this.submitClickHandler}>
                            {this.props.buttonName}
                        </button>
                    </div>
                </div>
        </div>
        )
    }
}

function mapStateToProps(state,ownProps){
    return {
        ...ownProps,
        value:state.parse.appState.data.url||''
    }
}

function mapDispatchToProps(dispatch){
    return {
        showMessage:(info,text)=>{
            dispatch(showMessage(info,text))
        },
        dispatchSubmitData:(args,submitAction)=>{
            dispatch(submitAction(args));
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
     * Function that renders submitButton
     */
     submitAction:PropTypes.func.isRequired


}