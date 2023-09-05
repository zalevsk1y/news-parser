import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Select, SelectProps } from '../../../src/packages/components/Select';
import 'jest';
import '@testing-library/jest-dom';

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  const onChangeMock = jest.fn();

  const renderSelect = (props?: Partial<SelectProps>) => {
    const defaultProps: SelectProps = {
      onChange: onChangeMock,
      children: options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    };

    return render(<Select {...defaultProps} {...props} aria-label='Select an option' />);
  };

  it('should render select options correctly', () => {
    const { getByLabelText } = renderSelect();
    const selectElement = getByLabelText('Select an option') as HTMLSelectElement;

    expect(selectElement).toBeInTheDocument();
    expect(selectElement.options).toHaveLength(3);
    expect(selectElement.value).toBe('option1');
  });

  it('should call the onChange callback when an option is selected', () => {
    const { getByLabelText } = renderSelect();
    const selectElement = getByLabelText('Select an option') as HTMLSelectElement;

    fireEvent.change(selectElement, { target: { value: 'option2' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
