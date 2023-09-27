import { combineReducers } from '@reduxjs/toolkit';
import { parsedData } from './parsedData.reducer';
import { options } from './options.reducer';



export default combineReducers({ parsedData, options })