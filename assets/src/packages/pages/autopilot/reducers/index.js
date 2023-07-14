import { combineReducers } from 'redux';
import { templates } from '@news-parser/entities/templates/reducers';
import { crons } from '@news-parser/entities/crons/reducers';
import { message } from '@news-parser/entities/message/reducers';





const autopilotReducer = combineReducers({ templates,crons,message });
export default combineReducers({ parse: autopilotReducer });