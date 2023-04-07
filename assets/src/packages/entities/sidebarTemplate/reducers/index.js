import {parsedData} from './dialogData.reducer';
import {options} from './options.reducer';
import { combineReducers } from 'redux';



export default combineReducers({parsedData,options})