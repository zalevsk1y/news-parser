import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Message } from '../../../../src/packages/modules/Message/Message';
import 'jest';
import '@testing-library/jest-dom';

jest.mock('globals', () => {
  return {
    newsParserSettings: {},
    newsParserApiEndpoints: {}
  }
})

const mockStore = configureStore([]);

describe('Message Component', () => {
  it('should display the message text', () => {
    const initialState = {
      parse: {
        message: {
          type: 'info',
          text: 'This is an info message',
          timestamp: Date.now()
        }
      }
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Message />
      </Provider>
    );

    expect(screen.getByLabelText('Message text')).toHaveTextContent('This is an info message');
  });

  it('should close the message when the close button is clicked', async () => {
    const initialState = {
      parse: {
        message: {
          type: 'info',
          text: 'This is an info message',
          timestamp: Date.now()
        }
      }
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Message />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Close'));

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull();

    });
  });

  it('should open a new message after the previous one closes', async () => {
    const initialState = {
      parse: {
        message: {
          type: 'info',
          text: 'This is the first message',
          timestamp: Date.now()
        }
      }
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Message />
      </Provider>
    );

    expect(screen.getByLabelText('Message text')).toHaveTextContent('This is the first message');


    store.dispatch({
      type: 'SET_MESSAGE',
      payload: {
        type: 'success',
        text: 'This is the second message',
        timestamp: Date.now()
      }
    });
    console.log(store.getState());
   //await screen.findByText('This is the second message');

  });
});
