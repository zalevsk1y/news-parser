import React from 'react';
import config from '@news-parser/config/index';

type ErrorBoundaryState={hasError:boolean}
type ErrorBoundaryProps={children:React.ReactNode}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps,ErrorBoundaryState> {
    static getDerivedStateFromError(){
        return {hasError:true}
    }

    errorDetail:false|{error:Error,info:any}=false

    constructor(props:ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
      this.sendReport=this.sendReport.bind(this);

    }
  
    componentDidCatch(error:Error, info:any) {
      this.errorDetail={error,info};
    }

    sendReport(){
      window.open(config.errorReport.url, '_blank');
        }

    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h1>Sorry.Something went wrong.</h1>
              <h3>If you wand to send error report please click &quot;Send Report&quot; button.
              You will be redirected to error report page.Just paste details in &quot;leave comment&quot; section and click 
              &quot;Submit new issue&quot;.Thank you.</h3>
              <details>
                Title!
                <br />
                {this.errorDetail&&this.errorDetail.error.toString()}
                <br />
                Message!
                <br />
                {this.errorDetail&&this.errorDetail.error.stack}
              </details>  
              <br />
            <button type='button' onClick={this.sendReport}>Send Report</button>
          </div>
          )

      }
      return this.props.children; 
      
    }
  }
