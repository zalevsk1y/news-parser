import React from 'react';
import config from '@news-parser/config';
import {logErrorToService} from '@news-parser/helpers';

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
      this.sendReport=this.sendReport.bind(this)
    }
  
    componentDidCatch(error, info) {
      this.errorDetail={error,info}
      this.setState({hasError:true})
     
    }
    sendReport(){
      window.open(config.errorReport.url, '_blank');
        }
    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h1>Sorry.Something went wrong.</h1>
              <h3>If you wand to send error report please click "Send Report" button.
              You will be redirected to error report page.Just paste details in "leave comment" section and click 
              "Submit new issue".Thank you.</h3>
              <details>
                Title!
                <br></br>
                {this.errorDetail.error.toString()}
                <br></br>
                Message!
                <br></br>
                {this.errorDetail.error.stack}
              </details>  
              <br></br>
            <button type='button' onClick={this.sendReport}>Send Report</button>
          </div>
          )

      }else{
      return this.props.children; 
      }
    }
  }

  export default ErrorBoundary;