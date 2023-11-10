import React, { useCallback } from 'react';
import { validateIntupUrl } from '@news-parser/helpers/index'
import { InputForm } from '@news-parser/components/InputForm';

interface InputFormSectionProps {
  buttonName: string,
  initValue?:string
  inputSubmit: (url: string) => void,
  onInvalid?:(inputValue:string)=>void
  disabled?: boolean
}

export const InputFormSection: React.FC<InputFormSectionProps> = ({ buttonName, inputSubmit,onInvalid,initValue,disabled }) => {
  const inputSubmitHandler = useCallback((url: string) => {
    if (validateIntupUrl(url)) {
      inputSubmit(url);
    } else {
      onInvalid!==undefined&&onInvalid(url);
    }
  }, [inputSubmit]);
  return <InputForm buttonName={buttonName} submitAction={inputSubmitHandler} initValue={initValue!==undefined?initValue:''} disabled={disabled} isLoading={disabled}/>
}