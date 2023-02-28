import { TEMPLATE,GET } from "@news-parser/template/constants/index.js";
import { API_SUCCESS } from "../../actions/api.actions";
import { showMessage } from "../../actions/app.actions";
import { setTemplate } from "@news-parser/template/actions";

export const templateAPISuccessMiddleware=({dispatch})=>next=>action=>{
    next(action);
    if(action.type==`[${TEMPLATE}:${GET}]${API_SUCCESS}`){
        const {msg,options}=JSON.parse(action.payload.response);
        console.log(msg,options)
        options&&dispatch(setTemplate(options));
        msg&&dispatch(showMessage(msg.type,msg.text));
    }
}