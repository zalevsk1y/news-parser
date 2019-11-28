 
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
            dispatch(getPageHTML(url,dispatch))
        },
        createPostDraft:function(id,url,postData,options){
            if(options.saveParsingTemplate){
                dispatch(saveParsingTemplate({url,postData,dispatch,options}))
            }else{
                dispatch(createPostDraft(id,url,postData,options,dispatch));
            }
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(VisualConstructor); 