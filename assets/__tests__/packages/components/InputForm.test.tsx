import React from 'react';
import { render,screen, fireEvent } from '@testing-library/react';
import { InputForm } from '../../../src/packages/components/InputForm';
import 'jest';
import '@testing-library/jest-dom';

describe('InputForm', () => {
  const buttonName = 'Submit';
  const submitActionMock = jest.fn();
  const initValue = '';
  const disabled = false;
  const isLoading = false;
  const className = '';

  it('renders input and button correctly', () => {
    render(
      <InputForm
        buttonName={buttonName}
        submitAction={submitActionMock}
        initValue={initValue}
        disabled={disabled}
        isLoading={isLoading}
        className={className}
      />
    );

    const inputElement = screen.getByLabelText('URL Input');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls submitAction when button is clicked', () => {
    render(
      <InputForm
        buttonName={buttonName}
        submitAction={submitActionMock}
        initValue={initValue}
        disabled={disabled}
        isLoading={isLoading}
        className={className}
      />
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(submitActionMock).toHaveBeenCalled();
  });

  it('passes input value to submitAction when button is clicked', () => {
    render(
      <InputForm
        buttonName={buttonName}
        submitAction={submitActionMock}
        initValue={initValue}
        disabled={disabled}
        isLoading={isLoading}
        className={className}
      />
    );

    const inputElement = screen.getByLabelText('URL Input');
    const inputValue = 'https://example.com';
    fireEvent.change(inputElement, { target: { value: inputValue } });

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(submitActionMock).toHaveBeenCalledWith(inputValue);
  });

  it('disables button when disabled prop is true', () => {
    render(
      <InputForm
        buttonName={buttonName}
        submitAction={submitActionMock}
        initValue={initValue}
        disabled={true}
        isLoading={isLoading}
        className={className}
      />
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it('shows loading spinner when isLoading prop is true', () => {
    render(
      <InputForm
        buttonName={buttonName}
        submitAction={submitActionMock}
        initValue={initValue}
        disabled={disabled}
        isLoading={true}
        className={className}
      />
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('aria-busy', 'true');

    const spinnerElement = screen.getByLabelText('Loading...');
    expect(spinnerElement).toBeInTheDocument();
  });
});
