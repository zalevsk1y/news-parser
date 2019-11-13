import {types} from '../actions/option';

export const defaultOptionsState={
    noFeaturedImage:false,
    downloadImages:true,
    addSource:false,
    saveParsingTemplate:false
}

export function options(state=defaultOptionsState,action){

    switch (action.type){
        case types.TOGGLE_NO_FEATURED_IMAGE:
            return {...state,
                noFeaturedImage:!state.noFeaturedImage
            }
        default:
            return {...state}
    }
}