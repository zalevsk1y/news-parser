import { parsedData } from './parsedData.reducer';
import { options } from './options.reducer';
import { combineReducers } from 'redux';



export default combineReducers({ parsedData, options })