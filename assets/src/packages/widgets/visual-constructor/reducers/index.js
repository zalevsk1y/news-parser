
import {options} from './options.reducer';
import {parsedData} from './parsedData.reducer';
import {dialogData} from './dialogData.reducer';
import { combineReducers } from 'redux';



export default combineReducers({dialogData,parsedData,options});