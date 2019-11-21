import React from 'react';
import Message from './Message';
import InputForm from './InputForm';
import Posts from './Posts';
import Indicator from './Indicator';
import {connect} from 'react-redux';
import {parseRSSList} from '../actions';
import {ModalWindow} from '../components/ModalWindow';
import PropTypes from 'prop-types';
import Translate from './Translate';


class Main extends React.Component {
    constructor(props){
        super(props);
        this.init();
    }
    init(){
        if(!this.props.routeAction&&!this.props.url)return;
        this.props.getDataFromServer(this.props.routeAction,this.props.url);
    }
    render() {
        return (
            <div className={"wrap wrap-parsing"} >
                {(this.props.parseAction==='dialog'&&<ModalWindow type={this.props.dialog.type} />)}
                <div className="parsing-title">
                    <h1><Translate>News-Parser</Translate></h1>
                </div>
                <Indicator step={0.5}/>
                <Message />
                <InputForm />
                <Posts row='3'/>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        routeAction:state.route.action,
        parseAction:state.parse.action,
        url:state.route.url,
        dialog:state.parse.dialog,
    }
}
function mapDispatchToProps(dispatch){
    return{
        getDataFromServer:(action,url)=>{
            if(action=='list'){
                dispatch(parseRSSList({dispatch,url}));
            }
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);


Main.propTypes={
    action:PropTypes.string,
    url:PropTypes.string,
    getDataFromServer:PropTypes.func.isRequired,
  
}