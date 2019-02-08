import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Portal, Paragraph, Button,
} from 'react-native-paper';

class ErrorDialog extends Component {
  handlePress = () => {
    console.log('insied dialog handle press');
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { errMessage, errFlag } = this.props;
    return (
      <Portal testID="errorDialog">
        <Dialog visible={errFlag}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph testID="errorMessage">{errMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button testID="errOkBtn" onPress={this.handlePress}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

export default ErrorDialog;

ErrorDialog.propTypes = {
  errMessage: PropTypes.string.isRequired,
  errFlag: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
