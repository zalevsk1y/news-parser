import React from 'react';
import ReactDOM from 'react-dom';

import { parserRssInitialState } from './reducers/initialState';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from '@redux-devtools/extension';

import ErrorBoundary from "@news-parser/error-handler/index"
import parse from './reducers';
import Main from './components/Main';

// import '@news-parser/styles/parser-rss.scss';

// SetUp for Redux DevExtension.

const store = configureStore({
    reducer: parse,
    devTools: process.env.BUILD_MODE !== 'production',
    preloadedState: parserRssInitialState
});


window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <ErrorBoundary>
                    <Main />
            </ErrorBoundary>
        </Provider>
        , document.getElementById('parsing-rss-app'));
})



