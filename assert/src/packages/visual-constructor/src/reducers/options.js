import {types} from '../actions/option';

export const defaultOptionsState={
    noFeaturedMedia:false,
    downloadImages:true,
    addSource:false,
    saveParsingTemplate:false
}

export function options(state=defaultOptionsState,action){

    switch (action.type){
        case types.TOGGLE_NO_FEATURED_MEDIA:
            return {...state,
                noFeaturedMedia:!state.noFeaturedMedia
            }
        default:
            return {...state}
    }
}