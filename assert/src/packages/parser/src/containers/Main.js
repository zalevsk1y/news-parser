import React from 'react';
import Message from './Message';
import InputForm from './InputForm';
import Posts from './Posts';
import Indicator from './Indicator';
import {connect} from 'react-redux';
import {parseRSSList} from '../actions/';
import {getNonce,scrollTo,getYOffset,getXOffset} from '@news-parser/helpers'
import ModalGallery from './ModalGallery';
import VisualConstructor from './VisualConstructor';
import PropTypes from 'prop-types';
import Translate from './Translate';
import {document} from 'globals';

class Main extends React.Component {
    constructor(props){
        super(props);
        this.init();
        this.state={scroll:true};
        this.scroll=this.scroll.bind(this);
        this.renderDialog=this.renderDialog.bind(this);
        this.pageYOffset=0;
    }
    init(){
        const nonce=getNonce({page:'parse',action:'get'});
        if(!this.props.routeAction&&!this.props.url)return;
        this.props.getDataFromServer(this.props.routeAction,this.props.url,nonce);
    }
    scroll(state){
        
        switch(state){
                case (true):
                    document.documentElement.style.overflowY='auto';
                    document.body.style.overflowY='auto';
                    break;
                case(false):
                    document.documentElement.style.overflowY='hidden';
                    document.body.style.overflowY='scroll';
                break;
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.state.scroll&&!prevState.scroll)scrollTo(getXOffset,this.pageYOffset);
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.scroll&&!nextState.scroll)this.pageYOffset=getYOffset();
        return true;
    }
    renderDialog(){
        
        switch(this.props.dialog.type){
            case 'gallery':
                return <ModalGallery onStateChange={this.scroll} />;
            case 'visualConstructor':
                return   <VisualConstructor onStateChange={this.scroll} />;
            default: 
                return <></>; 
        }
    }
    render() {
        
      
        return (
            <div className={"wrap wrap-parsing"} >
                {(this.props.parseAction==='dialog'&&<this.renderDialog />)}
              
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
        routeAction:state.route.action,
        parseAction:state.parse.action,
        url:state.route.url,
        dialog:state.parse.dialog,
        
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