
import {options} from './options.reducer';
import {parsedData} from './parsedData.reducer';
import {dialogData} from './dialogData.reducer';
import { combineReducers } from 'redux';


export const defaultState={
    dialogData:{
        isFetching:false,
        isOpen:false,
        url:false,
        _id:false,
        frameIsReady:false,
        rawHTML:false
    },
    parsedData:{
        image:false,
        title:false,
        body:{}
    },
    options:{
        addFeaturedMedia:true,
        addSource:false,
        saveParsingTemplate:false
    },
    parseTemplate:{}
}



export default combineReducers({dialogData,parsedData,options});