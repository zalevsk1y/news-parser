import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from '@redux-devtools/extension';

import ErrorBoundary from "@news-parser/error-handler/index"
import autopilot from './reducers';


import Main from './components/Main';

// import '@news-parser/styles/parser-rss.scss';

const store = configureStore({
    reducer: autopilot,
    devTools: process.env.BUILD_MODE !== 'production'
});


window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <ErrorBoundary>
                <Main />
            </ErrorBoundary>
        </Provider>
        , document.getElementById('parsing-autopilot-app'));
})

