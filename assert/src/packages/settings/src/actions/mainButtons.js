import {types} from './index';
import config from "@news-parser/config"
import {oldServerData,newServerData} from '@news-parser/helpers';   

//import {store} from '../index'
function sendToServer(){
    return {
        type:types.main.SEND_REQUEST,
    }
}
export function resetToDefault(){
    return {
        type:types.main.RESET_TO_DEFAULT
    }
}
function responseFromServer(data){
    return{
        type:types.main.RECEIVE_RESPONSE,
        data:data.main
    }
}
function setAllSettings(data){
    return {
        type:types.main.SET_ALL_SETTINGS,
        settings:data.settings
    }
}

export function saveSettingsToServer (dispatch,settings,nonce){
  
    const parameters=config.emulateJSON?oldServerData('settings',settings):newServerData(settings);
    return dispatch=>{
        dispatch(sendToServer())
        return fetch(config.settingsApi.saveSettings+'&_wpnonce='+nonce,
        parameters
       )
       .then(response=>response.json())
       .then((json,error)=>{
            
           if(!error&&json){
            dispatch(responseFromServer(json));
        
           }
       })
    }
}
export function getSettingsFromServer (dispatch,nonce){
    const parameters=config.emulateJSON?oldServerData():newServerData();
    return dispatch=>{ 
        return fetch(config.settingsApi.getSettings+'&_wpnonce='+nonce,parameters)
       .then(response=>response.json())
       .then((json,error)=>{
           if(!error&&json){
            dispatch(setAllSettings(json));
           }
       })
    }
}
export function getDefaultSettingsFromServer (dispatch,nonce){
    const parameters=config.emulateJSON?oldServerData():newServerData();
    return dispatch=>{ 
        return fetch(config.settingsApi.getDefaultSettings+'&_wpnonce='+nonce,parameters)
       .then(response=>response.json())
       .then((json,error)=>{
           if(!error&&json){
            dispatch(setAllSettings(json));
           }
       })
    }
}