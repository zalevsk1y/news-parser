import { combineReducers } from '@reduxjs/toolkit';
import { templates } from '@news-parser/entities/templates/reducers';
import { cronOptions } from '@news-parser/entities/cronOptions/reducers';
import { message } from '@news-parser/entities/message/reducers';



const autopilotReducer = combineReducers({ templates, message, cronOptions });
export default combineReducers({ parse: autopilotReducer });