 
import {connect} from 'react-redux';
import {deselectPicture} from '../actions/galleryDialog';
import {closeDialog,parsePage} from '../actions'; 
import ModalGallery from '@news-parser/gallery-dialog';
import {getNonce} from '@news-parser/helpers';

function mapStateToProps(state){
    const status=state.parse.hasOwnProperty('dialog')&&state.parse.dialog.type==='gallery',
          data=state.parse.hasOwnProperty('dialog')&&state.parse.dialog.data,
          props={status,data};
          if(status&&state.parse.dialog.type==='gallery'){
              props.postID=state.parse.actionParams.postID;
              props.postURL=state.parse.url;
          }
    return props
}
function mapDispatchToProps(dispatch){
    return {
        sendGalleryData:(url,id,options)=>{
            const nonce=getNonce({page:'parse',action:'get'});
            dispatch(parsePage({dispatch,nonce,id,url,options}));
        },
        closeGalleryDialog:()=>{
            dispatch(closeDialog());
        },
        deselectItem:(id)=>{
            dispatch(deselectPicture(id));
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ModalGallery); 