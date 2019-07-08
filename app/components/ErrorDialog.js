import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Portal, Paragraph, Button,
} from 'react-native-paper';

class ErrorDialog extends Component {
  handlePress = () => {
    
    const { onClose } = this.props;
    onClose();
  };

  handleDelete = () => {
    const { onDelete } = this.props;
    onDelete();
  }

  render() {
    const { errMessage, errFlag, deleteReview } = this.props;
    return (
      <Portal testID="errorDialog">
        <Dialog visible={errFlag}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph testID="errorMessage">{errMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button testID="errOkBtn" onPress={deleteReview ? this.handleDelete : this.handlePress}>
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
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  deleteReview: PropTypes.bool,
};

ErrorDialog.defaultProps = {
  deleteReview: false,
  onClose: () => {},
  onDelete: () => {},
};
