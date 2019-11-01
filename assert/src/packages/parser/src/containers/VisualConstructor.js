 
import {connect} from 'react-redux';
import {closeDialog} from '../actions/';
import {getPageHTML} from '../actions/visualConstructorDialog';
import VisualConstructor from '@news-parser/visual-constructor/index';
import {getNonce} from '@news-parser/helpers';

function mapStateToProps(state){
 
    const status=state.parse.hasOwnProperty('dialog')&&state.parse.dialog.type==='visualConstructor',
          url=state.parse.url,
          isFetching=state.parse.dialog.hasOwnProperty('isFetching')&&state.parse.dialog.isFetching===true,
          frameData=state.parse.dialog.hasOwnProperty('rawHTML')?state.parse.dialog.rawHTML:false;

    return {
        open:status,
        url,
        isFetching,
        frameData
    }
}
function mapDispatchToProps(dispatch){
    return {
        close:function (){
            dispatch(closeDialog());
        },
        getFrameData:function (url){
            dispatch(getPageHTML(url,dispatch))
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(VisualConstructor); 