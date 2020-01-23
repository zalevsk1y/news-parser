 
import {connect} from 'react-redux';
import {closeDialog} from '../actions';
import {getPageHTML,createPostDraft,saveParsingTemplate} from '@news-parser/visual-constructor/actions';
import VisualConstructor from '@news-parser/visual-constructor';


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
            dispatch(getPageHTML(dispatch,url))
        },
        createPostDraft:function(id,url,postData,options){
            if(options.saveParsingTemplate){
                dispatch(saveParsingTemplate(dispatch,url,postData,options))
            }else{
                dispatch(createPostDraft(dispatch,id,url,postData,options));
            }
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(VisualConstructor); 