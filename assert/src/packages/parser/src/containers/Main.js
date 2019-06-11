import React from 'react';
import Message from './Message';
import InputForm from './InputForm';
import Posts from './Posts';
import Indicator from './Indicator';
import {connect} from 'react-redux';

import {parseRSSList} from '../actions/';
import {getNonce} from '@news-parser/helpers'
import ModalGallery from './ModalGallery'
import PropTypes from 'prop-types';
import Translate from './Translate'

class Main extends React.Component {
    constructor(props){
        super(props);
        this.init();
        this.state={scroll:true};
        this.scroll=this.scroll.bind(this);
    }
    init(){
        const nonce=getNonce({page:'parse',action:'get'});
        if(!this.props.action&&!this.props.url)return;
        this.props.getDataFromServer(this.props.action,this.props.url,nonce);
    }
    scroll(state){
        this.setState({scroll:!state});
    }
    render() {
        const scrollClass=this.state.scroll?"":" no-scroll";
        return (
            <div className={"wrap wrap-parsing"+scrollClass} >
                <ModalGallery onStateChange={this.scroll} />
                <div className="parsing-title">
                    <h1><Translate>Parse News</Translate></h1>
                </div>
                <Indicator step={0.5}/>
                <Message />
                <InputForm />
                <Posts posts={this.props.posts} row='3'/>
          
            </div>
            
        )
    }
}
function mapStateToProps(state){
    return{
        action:state.route.action,
        url:state.route.url
    }
}
function mapDispatchToProps(dispatch){
    return{
        getDataFromServer:(action,url,nonce)=>{
            if(action=='list'){
                dispatch(parseRSSList({dispatch,url,nonce}));
            }
        }
            
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);


Main.propTypes={
    action:PropTypes.string,
    url:PropTypes.string,
    getDataFromServer:PropTypes.func.isRequired,
    posts:PropTypes.array
}