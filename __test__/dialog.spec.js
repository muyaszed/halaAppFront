import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import ErrorDialog from '../app/components/ErrorDialog';

describe('<ErrorDialog />', () => {
  jest.useFakeTimers();
  const handleClose = jest.fn();
  const { getByTestId } = render(
    <ErrorDialog
      onClose={handleClose}
      dialog={{ errorFlag: true }}
      errMessage={{ errors: { message: 'This is an error' } }}
    />,
  );
  const dialog = getByTestId('errorDialog');
  it('renders error correcttly', () => {
    const message = dialog.props.children.props.children[1].props.children.props.children;

    expect(dialog.props.children.props.visible).toBeTruthy();
    expect(message).toBe('This is an error');
  });

  it('calls the handle function correctly when ok button nis pressed', () => {
    const okBtn = dialog.props.children.props.children[2].props.children;
    fireEvent.press(okBtn);
    expect(handleClose).toBeCalled();
  });
});
