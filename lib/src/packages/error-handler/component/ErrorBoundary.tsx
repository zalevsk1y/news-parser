import React from 'react';
import config from '@news-parser/config/index';

type ErrorBoundaryState = { hasError: boolean, error: false | Error, info: any }
type ErrorBoundaryProps = { children: React.ReactNode }

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {


  errorDetail: false | { error: Error, info: any } = false

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: false, info: false };
    this.sendReport = this.sendReport.bind(this);

  }

  componentDidCatch(error: Error, info: any) {
    this.setState({ error, info, hasError: true });
  }

  sendReport() {
    window.open(config.errorReport.url, '_blank');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='container w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
          <h1>Error occurred in News Parser plugin!</h1>
          <p>You can send information about this error without providing any personal information.</p>
          <form className='form' action='https://submit-form.com/23nWbOS3' method='post'>
            <input type='hidden' name='errorTitle' value={this.state.error.toString()} />
            <input type='hidden' name='errorStack' value={this.state.error !== false ? this.state.error.stack : undefined} />
            <input type='submit' className=' btn btn-outline-primary' value='Send Error Report' />
          </form>
        </div>

      )
    }
    return this.props.children;
  }
}
