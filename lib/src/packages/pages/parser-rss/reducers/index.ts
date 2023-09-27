import { combineReducers } from '@reduxjs/toolkit';
import { items } from '@news-parser/entities/post/reducers';
import { message } from '@news-parser/entities/message/reducers';
import { sidebar } from '@news-parser/entities/sidebar/reducers';
import { template } from '@news-parser/entities/template/reducers';
import  sidebarTemplate from '@news-parser/entities/sidebarTemplate/reducers'
import dialog from '@news-parser/widgets/visual-constructor/reducers'



const parserReducer = combineReducers({ items, dialog, message, sidebar, sidebarTemplate, template });
export default combineReducers({ parse: parserReducer });