import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PopUpTimeDate, PopUpTimeDateProps } from '../../../../src/packages/components/sidebar/PopUpTimeDate';
import 'jest'
import '@testing-library/jest-dom';


describe('PopUpTimeDate', () => {
  const onChangeMock = jest.fn();

  const renderComponent = (props: Partial<PopUpTimeDateProps> = {}) => {
    const defaultProps: PopUpTimeDateProps = {
      value: { date: false },
      onChange: onChangeMock,
    };
    const mergedProps = { ...defaultProps, ...props };
    return render(<PopUpTimeDate {...mergedProps} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with default props', () => {
    renderComponent();
    expect(screen.getByTestId('pop-up-window')).toHaveClass('pop-up-close');
    expect(screen.getByText('Immediately')).toBeInTheDocument();
  });

  it('should render the component with provided date value', () => {
    const dateValue = '2022-08-21T15:30';
    renderComponent({ value: { date: dateValue } });
    expect(screen.getByTestId('post-publish-date')).toHaveTextContent('8/21/2022, 3:30:00 PM');
  });

  it('should call onChange with the selected date when Submit button is clicked', () => {
    const dateValue = '2022-08-21T15:30';
    renderComponent();
  
    const setTimeDate = screen.getByText('Immediately');

    fireEvent.click(setTimeDate);
    fireEvent.change(screen.getByTestId('datetime-local-input'),{ target: { value: dateValue } });
    expect(screen.getByTestId('pop-up-window')).toHaveClass('pop-up-open');
    fireEvent.click(screen.getByRole('submit'));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(dateValue);
    expect(setTimeDate).toHaveTextContent('8/21/2022, 3:30:00 PM');
  });

  it('should call onChange with the original date when Reset button is clicked', () => {
    const dateValue = '2022-08-21T15:30';
    renderComponent({ value: { date: dateValue } });
    const resetButton = screen.getByRole('reset');

    fireEvent.click(resetButton);

    expect(screen.getByTestId('post-publish-date')).toHaveTextContent('Immediately');
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });

  // Add more test cases as needed to cover different scenarios and functionality
});
