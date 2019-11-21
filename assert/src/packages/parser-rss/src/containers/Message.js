import Message from '@news-parser/message'
import {connect} from 'react-redux';



function mapStateToProps(state){

    const type=state.parse.message?state.parse.message.type:undefined,
          text=state.parse.message?state.parse.message.text:undefined,
          time=state.parse.message?state.parse.message.timestamp:undefined;
       
    return {
        open:Boolean(state.parse.message),
        type,
        text,
        time
    }
}
export default connect(mapStateToProps)(Message);


