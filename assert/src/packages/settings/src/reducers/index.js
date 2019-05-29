import general from './generalPage.js';
import post from './postPage.js';
import gallery from './galleryPage.js';
import {main} from './main.js'
import {combineReducers} from 'redux';

const settings=combineReducers({
    general,
    post,
    gallery,
})
const  settingsReducer=combineReducers({
    main,
    settings
})

function flowLeftToRight(funcObject){
    return (state,action)=>{
        let newState=state;
        const funcArray=Object.keys(funcObject)
        for(var i=0,end=funcArray.length;i<end;i++){
            var funcName=funcArray[i];
            newState=funcObject[funcName].apply(this,[newState,action]);
        }
        return newState;
    }
}
export default settingsReducer;