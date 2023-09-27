import React, { useCallback } from 'react';
import { validateIntupUrl, setUrlSearchParams } from '@news-parser/helpers/index'
import { InputForm } from '@news-parser/components/InputForm';
import { configConstantsEntities } from '@news-parser/config/constants';
import { useShowMessage } from '@news-parser/entities/message/hooks/';

interface InputFormSectionProps {
  buttonName: string,
  initValue: string,
  disabled: boolean
}

export const InputFormSection: React.FC<InputFormSectionProps> = ({ buttonName, initValue, disabled }) => {
  const showMessage = useShowMessage()
  const inputSubmitHandler = useCallback((url: string) => {
    if (validateIntupUrl(url)) {
      setUrlSearchParams({ entity: configConstantsEntities.PARSER_RSS_LIST, url })
    } else {
      showMessage('error', 'Please enter valid url.');
    }
  }, [configConstantsEntities.PARSER_RSS_LIST, setUrlSearchParams]);
  return <InputForm className='np-fs-16' buttonName={buttonName} submitAction={inputSubmitHandler} initValue={initValue} disabled={disabled} isLoading={disabled} />
}