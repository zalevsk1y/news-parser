

import visualConstructor from '@news-parser/visual-constructor/reducers'
/**
 * Combine dialog sub reducers to create flat dialog data structure.
 * 
 * @param {object} state 
 * @param {object} action 
 */
export default function dialog(state={},action){
let subReducers=[visualConstructor],
        newState=state;
        subReducers.forEach(reducer => {
            newState=reducer.call(this,newState,action)
        });
    return newState;
}