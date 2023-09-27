import React from 'react';
import { render,screen, fireEvent } from '@testing-library/react';
import { TagInput } from '../../../../src/packages/components/sidebar/TagInput';
import 'jest';
import '@testing-library/jest-dom';

describe('TagInput', () => {
  it('calls onCreate when Enter key is pressed', () => {
    const onCreateMock = jest.fn();
    const labelText = 'Tag Input';
    render(
      <TagInput onCreate={onCreateMock} labelText={labelText} bottomCapture='Test capture' >Test children</TagInput>
    );

    const inputElement = screen.getByLabelText(labelText) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'tag1' } });
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(onCreateMock).toHaveBeenCalledWith('tag1');
    expect(inputElement.value).toBe('');

    fireEvent.change(inputElement, { target: { value: 'tag2' } });
    fireEvent.keyDown(inputElement, { key: ',' });

    expect(onCreateMock).toHaveBeenCalledWith('tag2');
    expect(inputElement.value).toBe('');
  });
});
