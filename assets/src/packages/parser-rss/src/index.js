import React from 'react';
import ReactDOM from 'react-dom';

import Main from './containers/Main';

import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import parse from './reducers';

import {mainMiddleware} from './middleware/core/main';
import {errorMiddleware} from './middleware/core/error';
import {apiMiddleware} from './middleware/core/api';

import {listMiddleware} from './middleware/api/list';
import {pageMiddleware} from './middleware/api/page';
import {templateAPISuccessMiddleware} from './middleware/api/template';
import {wpCategoryMiddleware} from './middleware/api/wp.category';
import {wpTagMiddleware} from './middleware/api/wp.tag';


import {postMiddleware} from './middleware/app/post';
import {fetchingMiddleware} from './middleware/app/fetching';
import {submitMiddleware} from './middleware/app/submit';
import {appDialogOpenMiddleware} from './middleware/app/dialog'

import {dialogDataMiddleware} from '@news-parser/visual-constructor/middleware/app/dialogData';

import {htmlMiddleware} from '@news-parser/visual-constructor/middleware/api/html';
import {postMiddleware as visualConstructorPostMiddleware} from '@news-parser/visual-constructor/middleware/api/post';
import {mediaMiddleware} from '@news-parser/visual-constructor/middleware/api/media';
//import {templateMiddleware} from '@news-parser/visual-constructor/middleware/api/template';
import {fetchingMiddleware as dialogFetchingMiddleware} from '@news-parser/visual-constructor/middleware/app/fetching';

import { categoriesMiddleware as sidebarCategorieMiddleware } from '@news-parser/sidebar/middleware/categories';
import { tagsMiddleware as sidebarTagsMiddleware } from '@news-parser/sidebar/middleware/tags';

import { templateMiddleware } from '@news-parser/template/middleware';

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
            wpCategoryMiddleware,
            wpTagMiddleware,
            submitMiddleware,
            appDialogOpenMiddleware,
            dialogDataMiddleware,
            htmlMiddleware,
            visualConstructorPostMiddleware,
            mediaMiddleware,
            templateAPISuccessMiddleware,
            fetchingMiddleware,
            errorMiddleware,
            dialogFetchingMiddleware,
            sidebarCategorieMiddleware,
            sidebarTagsMiddleware,
            templateMiddleware
        )));
store.dispatch(startApp())
window.addEventListener('DOMContentLoaded',()=>{

    ReactDOM.render(
       
            <Provider store={store}> 
                <ErrorBoundary>
                    <Main />
                </ErrorBoundary>
            </Provider>
       , document.getElementById('parsing-rss-app'));
})



