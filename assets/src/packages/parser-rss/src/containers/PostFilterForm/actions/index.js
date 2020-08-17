import {ADD_POST_FILTER,REMOVE_POST_FILTER} from '../../../actions/post.actions';
export function addPostFilter(postFilterValue){
    return {
        type:ADD_POST_FILTER,
        payload:{
            filter:postFilterValue
        }
    }
}
export function removePostFilter(postFilterValue){
    return {
        type:REMOVE_POST_FILTER,
        payload:{
            filter:postFilterValue
        }
    }
}