import React from 'react';
import ReactDOM from 'react-dom';

import Main from './containers/Main';

import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import parse from './reducers';




import {apiMiddleware} from './middleware/core/api';
import {listMiddleware} from './middleware/app/list';
import {postMiddleware} from './middleware/app/post';
import {mainMiddleware} from './middleware/core/main';
import {pageMiddleware} from './middleware/app/page';
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
            thunkMiddleware
            
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



