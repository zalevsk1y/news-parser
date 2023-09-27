import React from 'react';
import { render,screen, fireEvent } from '@testing-library/react';
import { TabsNav } from '../../../../src/packages/components/tabs/TabsNav';
import 'jest';
import '@testing-library/jest-dom';

describe('TabsNav', () => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const onChangeMock = jest.fn();
  const activeTab = 0;

  it('renders tabs correctly', () => {
    render(
      <TabsNav tabs={tabs} onChange={onChangeMock} activeTab={activeTab} />
    );

    tabs.forEach((tab) => {
      const tabElement = screen.getByText(tab);
      expect(tabElement).toBeInTheDocument();
    });
  });

  it('calls onChange when a tab is clicked', () => {
    render(
      <TabsNav tabs={tabs} onChange={onChangeMock} activeTab={activeTab} />
    );

    const tabElement = screen.getByText(tabs[1]);
    fireEvent.click(tabElement);

    expect(onChangeMock).toHaveBeenCalledWith(1);
  });

  it('adds "active" class to the active tab', () => {
   render(
      <TabsNav tabs={tabs} onChange={onChangeMock} activeTab={activeTab} />
    );

    const activeTabElement = screen.getByText(tabs[activeTab]);
    expect(activeTabElement).toHaveClass('active');
  });

  it('does not add "active" class to inactive tabs', () => {
    render(
      <TabsNav tabs={tabs} onChange={onChangeMock} activeTab={activeTab} />
    );

    const inactiveTabIndex = 1;
    const inactiveTabElement = screen.getByText(tabs[inactiveTabIndex]);
    expect(inactiveTabElement).not.toHaveClass('active');
  });
});
