import React, { useCallback } from "react";
import { validateIntupUrl } from '@news-parser/helpers/'
import { InputForm } from '@news-parser/components/InputForm';

export const InputFormSection = ({ buttonName ,inputSubmit}) => {
  const inputSubmitHandler = useCallback((url) => {
    if (validateIntupUrl(url)) {
      inputSubmit(url);
    } else {
      showMessage('error', 'Please enter valid url.');
    }
  }, [inputSubmit]);
  return <InputForm buttonName={buttonName} submitAction={inputSubmitHandler} initValue={''} disabled={false} />
}