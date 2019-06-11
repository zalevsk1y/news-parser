import React from 'react';
import Tab from '../components/Tab';
import Button from '../components/Button';
import GeneralPage from './GeneralPage';
import PostPage from './PostPage';
import GalleryPage from './GalleryPage'
import {connect} from 'react-redux'
import {main} from '../actions/index'
import {getNonce} from '@news-parser/helpers';
import Message from "./Message";
import PropTypes from 'prop-types';
import Translate from './Translate';

export class Main extends React.Component {
    constructor(props){
      super(props);

      this.state={tabsArray:props.tabs};
      this.createTabs=this.createTabs.bind(this)
      this.selectHandler=this.selectHandler.bind(this)
      this.updateHandler=this.updateHandler.bind(this);
      this.saveSettings=this.saveSettings.bind(this);
      this.resetToDefault=this.resetToDefault.bind(this)
    }
    createTabs(args){
      return args.tabs.map(function(item,key){
        return (<Tab className={item.className} active={item.active} key={key} id={key} selectHandler={this.selectHandler} name={item.name} />);
      }.bind(this));
  
    }
    selectHandler(id){
      const state= this.state.tabsArray.map(function(item,key){
        item.active=key===id?true:false;
        return item;
      });
      this.setState({tabsArray:state,currentID:id});
    }
    saveSettings(){
      const nonce=getNonce({page:'settings',action:'save'})
      this.props.saveSettings(this.props.settings,nonce)
    }
    resetToDefault(){
      const nonce=getNonce({page:'settings',action:'get'})
      this.props.resetToDefault(nonce)
    }
    updateHandler(parameterName,state){
      const settings={...this.state.settings};
      settings[parameterName]=state;
      this.setState({settings:settings})
    }
    renderPage(props){
   
      switch(props.name){
        case 'General':
          return (<GeneralPage  />);
        case "Post":
          return (<PostPage  />);
        case "Gallery":
          return (<GalleryPage  />);
        default:
          return (<GeneralPage  />);
      }
      
     
    }
    translate(text){
      return (<Translate>{text}</Translate>)
    }
    render() {
      var tabId=this.state.currentID||0;
      return (
        <div className='wrap wrap-parsing'>
          <Message />
          <div className="parsing-title">
              <h1>
                <Translate>Settings</Translate>
                </h1>
          </div> {/*parsing-title*/}
          <div className="settings-main-tabs" >
             <this.createTabs tabs={this.state.tabsArray}/>
          </div> {/*settings-main-tabs*/}
          <div className='settings-container'>
            <this.renderPage name={this.state.tabsArray[tabId].name}/>
          </div>{/*settings-main-tabs*/}
          <Button onClick={this.saveSettings} value={this.translate("Save settings")} className='button-primary' action='save'></Button>
          <Button onClick={this.resetToDefault} value={this.translate('Reset settings')} className='button-secondary' action='reset'></Button>
        </div> 
      );
    }
  }
  function mapStateToProps(state){
      return {
        settings:state.settings
      }
  }
  function mapDispatchToProps (dispatch){
    
   
    return {
  
      resetToDefault:(nonce)=>{
        dispatch(main.getDefaultSettingsFromServer(dispatch,nonce))
      },
      saveSettings:(settings,nonce)=>{
        dispatch(main.saveSettingsToServer(dispatch,settings,nonce));
      }

    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Main);

  Main.propTypes={
    tabs:PropTypes.array.isRequired,
    settings:PropTypes.object.isRequired,

    resetToDefault:PropTypes.func.isRequired,
    saveSettings:PropTypes.func.isRequired
  }