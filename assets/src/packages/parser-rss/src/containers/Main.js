import React,{useMemo} from 'react';
import Message from '@news-parser/message/';
import InputForm from './InputForm';
import Posts from './Posts';
import Indicator from './Indicator';
import {useDispatch, useSelector} from 'react-redux';
import VisualConstructor from '@news-parser/visual-constructor/';
import {parseList} from '../actions/submit.action';
import PropTypes from 'prop-types';
import {parseSelected} from '../actions/page.actions';
import {SelectedPostsInfo} from './SelectedPostsInfo';
/**
 * Main application element.
 * 
 * @since 0.8.0
 */




const Main=( )=>{
    const dispatch=useDispatch();
    const [selectedPosts,parsedTemplate]=useSelector(state=>[state.parse.items.select,state.parse.template])
    const parseListAction=(url)=>dispatch(parseList(url))
    const selectedPostsCount=useMemo(()=>selectedPosts==undefined?0:Object.keys(selectedPosts).length,[selectedPosts]);
    const isSelectedInfoOpen=selectedPostsCount>0; 
    const parseSelectedAction=parsedTemplate?()=>dispatch(parseSelected()):false;
  
    return (
      <div className={"wrap"}>
        <VisualConstructor />
        <div className="parsing-title">
          <h1>News-Parser</h1>
        </div>
        <Indicator step={0.5} />
        <Message />
        <InputForm buttonName= "Parse RSS Feed" submitAction={parseListAction} />
        <div
          className={`selected-posts-info row justify-content-center ${
            isSelectedInfoOpen ? "" : "close-opacity"
          }`}
        >
          <SelectedPostsInfo postsCount={selectedPostsCount} submitAction={parseSelectedAction}/>
        </div>
        <Posts />
      </div>
    );
  }
  

export default Main;


Main.propTypes={
    /**
     * Current app parsing entity [list|single|multi]
     */
    submitType:PropTypes.string ,
     /**
     * Current app parsing entity parser-rss-[list|page|media]
     */
    entity:PropTypes.string 
}