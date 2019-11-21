import {types} from '../actions/galleryDialog';


export function galleryDialog(state={},action){
    switch(action.type){
        case types.SELECT_PICTURE:
            var data=state.data.map((item)=>{
                if(item.id===action.id){
                    item.select=true;
                }
                return item;
            })
            return {...state,data}
        case types.DESELECT_PICTURE:
            var data=state.data.map((item)=>{
                if(item.id===action.id){
                    item.select=false;
                };
                return item;
            })
            return {...state,data};
        case types.FOCUS_PICTURE:
            var data=state.data.map((item)=>{
                item.focus=(item.id===action.id)
                return item;
            })
            return {...state,data};
            case types.UPDATE_PICTURE_INFO:
            var data=state.data.map((item)=>{
                if(item.id===action.id){
                    item['info']=action.info;
                };
                return item;
            })
            return {...state,data};
        default:
            return {...state};
    }
}