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
function fetchError(error){
    return {
        type:types.main.FETCH_ERROR,
        data:{
            error:1,
            message:{
                type:'error',
                text:'Error connecting to the server.',
                timestamp:Date.now()
            }
        }
    }
}
export function saveSettingsToServer (dispatch,settings,nonce){
  
    const parameters=config.emulateJSON?oldServerData({'settings':settings}):newServerData(settings);
    return dispatch=>{
        dispatch(sendToServer())
        return fetch(config.settingsApi.saveSettings+'&_wpnonce='+nonce,
        parameters
       )
       .then(response=>response.json())
       .then((json)=>{
            
           if(json){
            dispatch(responseFromServer(json));
            
           }
       })
       .catch(error=>{
           dispatch(fetchError(error))
       })
    }
}
export function getSettingsFromServer (dispatch,nonce){
    const parameters=config.emulateJSON?oldServerData():newServerData();
    return dispatch=>{ 
        return fetch(config.settingsApi.getSettings+'&_wpnonce='+nonce,parameters)
       .then(response=>response.json())
       .then((json)=>{
           if(json){
            dispatch(setAllSettings(json));
           }
       })
       .catch(error=>{
        dispatch(fetchError(error))
    })
    }
}
export function getDefaultSettingsFromServer (dispatch,nonce){
    const parameters=config.emulateJSON?oldServerData():newServerData();
    return dispatch=>{ 
        return fetch(config.settingsApi.getDefaultSettings+'&_wpnonce='+nonce,parameters)
       .then(response=>response.json())
       .then((json,error)=>{
           if(json){
            dispatch(setAllSettings(json));
           }
       })
       .catch(error=>{
        dispatch(fetchError(error))
    })
    }
}