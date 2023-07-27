import React, { useCallback } from "react";
import { validateIntupUrl, setUrlSearchParams } from '@news-parser/helpers/'
import { InputForm } from '@news-parser/components/InputForm';
import { PARSER_RSS_LIST } from '@news-parser/config/constants';
import {useShowMessage} from '@news-parser/entities/message/hooks/';

export const InputFormSection = ({ buttonName, initValue, disabled }) => {
  const showMessage=useShowMessage()
  const inputSubmitHandler = useCallback((url) => {
    if (validateIntupUrl(url)) {
      setUrlSearchParams({ entity: PARSER_RSS_LIST, url })
    } else {
      showMessage('error', 'Please enter valid url.');
    }
  }, [PARSER_RSS_LIST, setUrlSearchParams]);
  return <InputForm className="np-fs-16" buttonName={buttonName} submitAction={inputSubmitHandler} initValue={initValue} disabled={disabled} isLoading={disabled}/>
}