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
import {getNonce} from '@news-parser/helpers';
import { LocalizeProvider } from "react-localize-redux";
export const store=createStore(settingsReducer,applyMiddleware(thunkMiddleware));

window.addEventListener('load',()=>{
    const nonce=getNonce({page:'settings',action:'get'});
    store.dispatch(main.getSettingsFromServer(store.dispatch,nonce));
    ReactDOM.render(
        <LocalizeProvider>
            <Provider store={store}>
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
            </Provider>
            </LocalizeProvider>,
             document.getElementById('settings-app'));

})



