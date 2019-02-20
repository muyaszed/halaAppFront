import React from 'react';
import {
  Portal, Modal, TextInput, Button,
} from 'react-native-paper';

const ModalForm = props => (
  <Portal>
    <Modal visible={props.visible} onDismiss={props.onDismiss} dismissable={false}>
      <TextInput
        label="your review"
        multiline
        value={props.value}
        onChangeText={props.onChangeText}
      />

      <Button mode="contained" onPress={props.onPress}>
        {props.btnLabel}
      </Button>
      {props.edit ? (
        <Button mode="contained" onPress={props.onDelete}>
          Delete
        </Button>
      ) : null}
      <Button mode="contained" onPress={props.onCancel}>
        Cancel
      </Button>
    </Modal>
  </Portal>
);

export default ModalForm;
