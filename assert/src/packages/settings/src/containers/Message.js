import Message from '@news-parser/message';
import {connect} from 'react-redux';



function mapStateToProps(state){

    const type=state.main.message?state.main.message.type:undefined,
          text=state.main.message?state.main.message.text:undefined,
          time=state.main.message?state.main.message.timestamp:undefined;
       
    return {
        open:Boolean(state.main.message),
        type,
        text,
        time
    }
}
export default connect(mapStateToProps)(Message);
