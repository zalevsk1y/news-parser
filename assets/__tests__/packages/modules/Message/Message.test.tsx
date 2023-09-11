import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Message } from '../../../../src/packages/modules/Message/Message';
import { message, MessageStateType } from '../../../../src/packages/entities/message/reducers';
import {SHOW_MESSAGE} from '../../../../src/packages/entities/message/actions/message.actions';
import { describe, it, jest } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('globals', () => {
  return {
    newsParserSettings: {},
    newsParserApiEndpoints: {}
  }
})
type MockStoreType = {
  parse: {
    message: MessageStateType
  }
}
describe('Message Component', () => {

  it('should display the message text', () => {
    const initialState:MockStoreType = {
      parse: {
        message: {
          type: 'info',
          text: 'This is an info message'
        }
      }
    };
    const mockStore = configureStore({
      reducer: { parse: combineReducers({ message }) },
      preloadedState: initialState
    });

    render(
      <Provider store={mockStore}>
        <Message />
      </Provider>
    );

    expect(screen.getByLabelText('Message text')).toHaveTextContent('This is an info message');
  });

  it('should close the message when the close button is clicked', async () => {
    const initialState:MockStoreType = {
      parse: {
        message: {
          type: 'info',
          text: 'This is an info message',
        }
      }
    };
    const mockStore = configureStore({
      reducer: { parse: combineReducers({ message }) },
      preloadedState: initialState
    });

    render(
      <Provider store={mockStore}>
        <Message />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Close'));

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull();

    });
  });

  it('should open a new message after the previous one closes', async () => {
    const initialState:MockStoreType = {
      parse: {
        message: {
          type: 'info',
          text: 'This is the first message',
        }
      }
    };
    const mockStore = configureStore({
      reducer: { parse: combineReducers({ message }) },
      preloadedState: initialState
    });

    render(
      <Provider store={mockStore}>
        <Message />
      </Provider>
    );

    expect(screen.getByLabelText('Message text')).toHaveTextContent('This is the first message');


    mockStore.dispatch({
      type: SHOW_MESSAGE,
      payload: {
        type: 'success',
        text: 'This is the second message',
      }
    });
    const secondMessage= await screen.findByText('This is the second message')
    expect(secondMessage).toBeInTheDocument();

  });
});
