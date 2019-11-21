import React from 'react';
import ReactDOM from 'react-dom';
//import './font.css';
//import './my-style.css';
import Main from './containers/Main';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import settingsReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import {main} from './actions/index';
import {getAjaxNonce} from '@news-parser/helpers';
import ErrorBoundary from "@news-parser/error-handler"

export const store=createStore(settingsReducer,applyMiddleware(thunkMiddleware));
window.addEventListener('error',function(event){
    alert('error');
})
window.addEventListener('load',()=>{
    const nonce=getAjaxNonce();
    store.dispatch(main.getSettingsFromServer(store.dispatch,nonce));
  
    ReactDOM.render(
        
            <Provider store={store}>
                <ErrorBoundary>
                    <Main tabs={
                        [
                            {   
                                className:'general',
                                active:true,
                                name:'General'
                            },
                            {   
                                className:'post',
                                active:false,
                                name:'Post'
                            },
                            {
                                className:'gallery',
                                active:false,
                                name:'Gallery'
                            }
                        ]
                    }/>
                </ErrorBoundary>
            </Provider>
            ,
             document.getElementById('settings-app'));

})



