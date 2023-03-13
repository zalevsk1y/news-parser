import {START_PARSE_APP,setAppState, SET_APP_STATE} from '../../actions/app.actions';
import {fetchList} from '../../actions/list.actions';
import {LIST,PARSE} from '../../constants';
import {PARSER_RSS_LIST} from "@news-parser/config/constants";
import {setRoute} from '../../actions/route.actions';
import {setUrlSearchParams,getUrlSearchParams} from '@news-parser/helpers'

export const  mainMiddleware=({dispatch})=>next=>action=>{
    next(action);
    switch(action.type){
        case START_PARSE_APP:
            const urlParams=getUrlSearchParams();
            dispatch(setRoute(urlParams.get('page')));
            switch(urlParams.get('entity')){
                case LIST:
                   // dispatch(fetchList(urlParams.get('url')));
                    break;
            }
            break;
       
    }
}