import { openDialog as openVisualConstructor } from "../../../../visual-constructor/src/actions/dialogData.actions";
import { VISUAL_CONSTRUCTOR } from "../../../../visual-constructor/src/constants";
import {APP_DIALOG_OPEN} from "../../actions/app.actions"

export const appDialogOpenMiddleware=({dispatch})=>next=>action=>{
    next(action);
    if(action.type.includes(APP_DIALOG_OPEN)){
        let dialogType=action.type.match(/\[(.*)\]/)[1].split('.')[2];
        switch (dialogType){
            case VISUAL_CONSTRUCTOR:
                dispatch(openVisualConstructor(action.payload.url,action.payload._id))
        }
    }
}