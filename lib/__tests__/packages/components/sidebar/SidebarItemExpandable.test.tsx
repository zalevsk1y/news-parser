import React from 'react';
import { render,screen, fireEvent } from '@testing-library/react';
import { SidebarItemExpandable } from '../../../../src/packages/components/sidebar/SidebarItemExpandable';
import 'jest';
import '@testing-library/jest-dom';


describe('SidebarItemExpandable', () => {
  it('should toggle itemOpen state when expand button is clicked', () => {

    const expandButton = {
      value:'Expand Button',
      className:'pop-up-aria'
    };

    // Render the SidebarItemExpandable component with the mock expandButton
    render(
      <SidebarItemExpandable expandButton={expandButton}>
        <div>Child Content</div>
      </SidebarItemExpandable>
    );

    const groupElement=screen.getByTestId('sidebar-item-expandable-area')
    expect(groupElement.getAttribute('aria-hidden')).toBe('true');
    expect(screen.getByText('Expand Button')).toHaveClass('pop-up-aria')
    fireEvent.click(screen.getByText('Expand Button'));
   
    expect(groupElement.getAttribute('aria-hidden')).toBe('false');
    
    fireEvent.click(screen.getByText('Expand Button'));
    
    expect(groupElement.getAttribute('aria-hidden')).toBe('true');
   
  });
});
