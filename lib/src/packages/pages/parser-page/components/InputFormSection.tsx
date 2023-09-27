import React, { useCallback } from 'react';
import { validateIntupUrl } from '@news-parser/helpers/index'
import { InputForm } from '@news-parser/components/InputForm';
import { useShowMessage } from '@news-parser/entities/message/hooks';

interface InputFormProps {
  buttonName: string,
  inputSubmit: (url: string) => void
}

export const InputFormSection: React.FC<InputFormProps> = ({ buttonName, inputSubmit }) => {
  const showMessage = useShowMessage()
  const inputSubmitHandler = useCallback((url: string) => {
    if (validateIntupUrl(url)) {
      inputSubmit(url);
    } else {
      showMessage('error', 'Please enter valid url.');
    }
  }, [inputSubmit]);
  return <InputForm buttonName={buttonName} submitAction={inputSubmitHandler} initValue="" disabled={false} />
}