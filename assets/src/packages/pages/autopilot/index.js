import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';

import { Provider } from 'react-redux';
import {createStore  } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import autopilot from './reducers';

import ErrorBoundary from "@news-parser/error-handler"

// import '@news-parser/styles/parser-rss.scss';

//SetUp for Redux DevExtension.

const store=createStore(autopilot,composeWithDevTools());

window.addEventListener('DOMContentLoaded',()=>{

    ReactDOM.render(
       
            <Provider store={store}> 
                <ErrorBoundary>
                    <Main />
                </ErrorBoundary>
            </Provider>
       , document.getElementById('parsing-autopilot-app'));
})



