 
import {connect} from 'react-redux';
import {closeDialog} from '../actions/';
import {getPageHTML,createPostDraft} from '../../../visual-constructor/src/actions';
import VisualConstructor from '@news-parser/visual-constructor/index';


function mapStateToProps(state){
 
    const status=state.parse.hasOwnProperty('dialog')&&state.parse.dialog.type==='visualConstructor',
          dialog=state.parse.hasOwnProperty('dialog')?state.parse.dialog:{};
    return {...dialog,
        status    
    };
}
function mapDispatchToProps(dispatch){
    return {
        close:function (){
            dispatch(closeDialog());
        },
        getFrameData:function (url){
            dispatch(getPageHTML(url,dispatch))
        },
        createPostDraft:function(id,url,postData,options){
            dispatch(createPostDraft(id,url,postData,options,dispatch));
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(VisualConstructor); 