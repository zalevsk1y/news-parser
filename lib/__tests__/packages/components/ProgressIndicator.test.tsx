import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressIndicator } from '../../../src/packages/components/ProgressIndicator';
import { useScrolling } from '../../../src/packages/hooks/useScrolling';
import 'jest';
import '@testing-library/jest-dom';

const disableScrolling=jest.fn();
jest.mock('../../../src/packages/hooks/useScrolling',()=>{
    return {
        useScrolling:()=>([jest.fn(),disableScrolling])
    }
});
describe('ProgressIndicator', () => {
    const progressText = 'Progress 1/10';
    
    it('renders the progress bar with correct width', () => {
        const total = 10;
        const count = 5;
        render(<ProgressIndicator total={total} count={count} hidden={false}>{progressText}</ProgressIndicator>);

        const progressBar = screen.getByTestId('progress-bar-inner');
        const expectedWidth = `${Math.round(100 * count / total)}%`;

        expect(progressBar).toHaveStyle({ width: expectedWidth });
    });

    it('renders the child component', () => {
        render(
            <ProgressIndicator total={10} count={5} hidden={false}>
                <div>Child Component</div>
            </ProgressIndicator>
        );

        const childComponent = screen.getByText('Child Component');
        expect(childComponent).toBeInTheDocument();
    });

    it('hides the progress bar when "hidden" prop is true', () => {
        render(<ProgressIndicator total={10} count={5} hidden={true} >{progressText}</ProgressIndicator>);

        const progressIndicatoreContainer = screen.getByTestId('progress-indicator-container');
        expect(progressIndicatoreContainer).toHaveAttribute('hidden');
    });

    it('disables scrolling when "hidden" prop is false', () => {
        render(<ProgressIndicator total={10} count={5} hidden={false} >{progressText}</ProgressIndicator>);

        // Assert that the disableScrolling function is called
        expect(disableScrolling).toHaveBeenCalled();
    });

    it('has correct ARIA attributes', () => {
        const total = 10;
        const count = 5;
        render(<ProgressIndicator total={total} count={count} hidden={false}>{progressText}</ProgressIndicator>);

        const progressBar = screen.getByTestId('progress-bar-inner');
        const progressIndicatoreContainer=screen.getByRole('group');
        expect(progressBar).toHaveAttribute('role', 'progressbar');
        expect(progressBar).toHaveAttribute('aria-valuemin', '0');
        expect(progressBar).toHaveAttribute('aria-valuemax', total.toString());
        expect(progressBar).toHaveAttribute('aria-valuenow', count.toString());
        expect(progressIndicatoreContainer).toHaveAttribute('aria-hidden', 'false');
    });
});
