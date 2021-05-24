import React from 'react';
import Message from '@news-parser/message/';
import InputForm from './InputForm';
import Posts from './Posts';
import Indicator from './Indicator';
import {connect} from 'react-redux';
import VisualConstructor from '@news-parser/visual-constructor/';
import PropTypes from 'prop-types';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */

class Main extends React.Component {
    constructor(props){
        super(props);
   
    }
  
    render() {
        return (
            <div className={"wrap"} >
                <VisualConstructor />
                <div className="parsing-title">
                    <h1>News-Parser</h1>
                </div>
                <Indicator step={0.5}/>
                <Message />
                <InputForm />
                <Posts />
            </div>
        )
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