import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Tabs, TabsProps } from '../../../src/packages/components/Tabs';
import { describe, it } from '@jest/globals';
import '@testing-library/jest-dom';

describe('Tabs', () => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const children = [
    <div key="tab1">Tab 1 Content</div>,
    <div key="tab2">Tab 2 Content</div>,
    <div key="tab3">Tab 3 Content</div>,
  ];

  const renderTabs = (props?: Partial<TabsProps>) => {
    const defaultProps: TabsProps = {
      tabs,
      children,
    };

    return render(<Tabs {...defaultProps} {...props} />);
  };

  it('should render tabs and content correctly', () => {
    const { getByText, queryByText } = renderTabs();
    const tab1 = getByText('Tab 1');
    const tab2 = getByText('Tab 2');
    const tab3 = getByText('Tab 3');

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(tab3).toHaveAttribute('aria-selected', 'false');

    const tab1Content = getByText('Tab 1 Content');
    expect(tab1Content).toBeInTheDocument();
    expect(tab1Content).toBeVisible();

    const tab2Content = queryByText('Tab 2 Content');
    expect(tab2Content).not.toBeInTheDocument();


    const tab3Content = queryByText('Tab 3 Content');
    expect(tab3Content).not.toBeInTheDocument();
  });

  it('should switch active tab and display corresponding content when clicked', () => {
    const { getByText, queryByText } = renderTabs();
    const tab1 = getByText('Tab 1');
    const tab2 = getByText('Tab 2');


    fireEvent.click(tab2);

    const tab2Content = queryByText('Tab 2 Content');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(tab2Content).toBeVisible();

    const tab1Content = queryByText('Tab 1 Content');
    const tab3Content = queryByText('Tab 3 Content');

    expect(tab1Content).not.toBeInTheDocument();
    expect(tab3Content).not.toBeInTheDocument();

    fireEvent.click(tab1);

    const tab1ContentAfterClick = queryByText('Tab 1 Content');
    const tab2ContentAfterClick = queryByText('Tab 2 Content');

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab1ContentAfterClick).toBeVisible();
    expect(tab2ContentAfterClick).not.toBeInTheDocument();
  });
});
