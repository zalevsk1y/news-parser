import React from 'react';
import ReactDOM from 'react-dom';

import Main from './containers/Main';

import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import parse from './reducers';

import {mainMiddleware} from './middleware/core/main';
import {errorMiddleware} from './middleware/core/error';
import {apiMiddleware} from './middleware/core/api';

import {listMiddleware} from './middleware/api/list';
import {pageMiddleware} from './middleware/api/page';

import {postMiddleware} from './middleware/app/post';
import {fetchingMiddleware} from './middleware/app/fetching';


import {dialogMiddleware} from '@news-parser/visual-constructor/middleware/app/dialog';

import {htmlMiddleware} from '@news-parser/visual-constructor/middleware/api/html';
import {draftMiddleware} from '@news-parser/visual-constructor/middleware/api/draft';
import {mediaMiddleware} from '@news-parser/visual-constructor/middleware/api/media';
import {templateMiddleware} from '@news-parser/visual-constructor/middleware/api/template';
import {fetchingMiddleware as dialogFetchingMiddleware} from '@news-parser/visual-constructor/middleware/app/fetching';

import {startApp} from './actions/app.actions';
import thunkMiddleware from 'redux-thunk';
import ErrorBoundary from "@news-parser/error-handler"

import '@news-parser/styles/parser-rss.scss';

//SetUp for Redux DevExtension.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(
        parse,
        composeEnhancers(
        applyMiddleware(
            apiMiddleware,
            mainMiddleware,
            listMiddleware,
            postMiddleware,
            pageMiddleware,
            dialogMiddleware,
            htmlMiddleware,
            draftMiddleware,
            mediaMiddleware,
            templateMiddleware,
            fetchingMiddleware,
            errorMiddleware,
            dialogFetchingMiddleware
            
        )));
store.dispatch(startApp())
window.addEventListener('load',()=>{
    ReactDOM.render(
       
            <Provider store={store}> 
                <ErrorBoundary>
                    <Main />
                </ErrorBoundary>
            </Provider>
       , document.getElementById('parsing-rss-app'));
})



