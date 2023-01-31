import React,{useLayoutEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {decodeHTMLEntities} from '@news-parser/helpers/'
/**
 * Message window element.
 * 
 * @since 0.8.0
 */



const Message = ({type,text,timestamp}) => {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
  //If get mew message close current message and open new one in 400ms.
    useLayoutEffect(() => {
        if (open) {
          close();
          setTimeout(() => {
            setOpen(true);
          }, 400);
        } else if(timestamp!==undefined) {
          setOpen(true);
        }
    }, [timestamp]);
    const infoIcon=(type)=>{
        switch(type){
            case 'success':
                return 'bi-check-circle-fill';
            case 'error':
                return'bi-exclamation-octagon-fill';
            case 'info':
                return 'bi-info-circle-fill'
        }
    }
    return (
      <div className="message-wrapper">
        <div class={`alert alert-${type} alert-dismissible fade ${open?'show':''}`}>
        <i className={infoIcon(type)} ></i>

        <span className='mx-3'>{text}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={close}></button>
    </div>

      </div>
    );
  }



function mapStateToProps(state){

    const {type,text,timestamp}=state.parse.message;
       
    return {
        type,
        text:text?decodeHTMLEntities(text):'',
        timestamp
    }
}
;




Message.propTypes={
    /**
     * Message type [error,info,success]
     */
    type:PropTypes.string,
    /**
     * Message text.
     */
    text:PropTypes.string,
    /**
     * Timestamp of the message.
     */
    timestamp:PropTypes.number
}

export default connect(mapStateToProps)(Message)