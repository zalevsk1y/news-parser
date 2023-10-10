import React from 'react';
import ReactDOM from 'react-dom';
//import './my-style.css';
import Main from './containers/Main';

import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import parse from './reducers';
import {uriToJson} from '@news-parser/helpers';

import {setRoute} from './actions';
import thunkMiddleware from 'redux-thunk';
import ErrorBoundary from "@news-parser/error-handler"
//import App from './App';

const store=createStore(
        parse,
        applyMiddleware(
            thunkMiddleware
        )),
      currentUri=window.location.search,
      uriParams=uriToJson(currentUri);

store.dispatch(setRoute(uriParams))
window.addEventListener('load',()=>{
    ReactDOM.render(
       
            <Provider store={store}> 
                <ErrorBoundary>
                    <Main />
                </ErrorBoundary>
            </Provider>
       , document.getElementById('parsing-app'));
})



