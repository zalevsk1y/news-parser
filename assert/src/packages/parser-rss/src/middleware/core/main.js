import {START_PARSE_APP,setAppState} from '../../actions/app.actions';
import {fetchList} from '../../actions/list.actions';
import {LIST} from '../../constants'
import {setRoute} from '../../actions/route.actions';
import {urlSearchParams} from '@news-parser/helpers'

export const  mainMiddleware=({dispatch})=>next=>action=>{
    next(action);
    switch(action.type){
        case START_PARSE_APP:
            const currentUri=window.location.search,
            urlParams=urlSearchParams(currentUri);
            dispatch(setRoute(urlParams.page));
            switch(urlParams.entity){
                case LIST:
                    dispatch(fetchList(decodeURIComponent(urlParams.url)));
                    break;
            }
            break;
    }
}