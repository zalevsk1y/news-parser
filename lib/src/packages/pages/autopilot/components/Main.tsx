import React, { useEffect } from 'react';
import Message from '@news-parser/modules/Message';
import { useFetchTemplates } from '@news-parser/entities/templates/hooks/useFetchTemplates';
import { RightSection } from './RightSection';
import { MainOptionsBlock } from './MainOptionsSection';
import '../../styles/Main.css'

/**
 * Main application element.
 * 
 * @since 2.0.0
 */


const Main: React.FC = () => {
  const [, fetchTemplates] = useFetchTemplates();
  useEffect(() => {
    fetchTemplates();
  }, [])
  return (
    <div className='container'>
      <div className='parsing-title'>
        <h1>News-Parser <b className='main-page-header'>Autopilot</b></h1>
      </div>
      <Message />
      <div className='row mt-4 d-flex flex-row justify-content-center'>
        <div className='col-md-3 col-lg-4 order-md-last d-flex flex-column'>
          <RightSection />
        </div>
        <div className='col-md-9 col-lg-7 col-xl-6'>
          <MainOptionsBlock />
        </div>
        
      </div>
    </div>
  );
}


export default Main;
