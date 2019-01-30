import React, { Component } from "react";
import { Dialog, Portal, Paragraph, Button } from 'react-native-paper';

export default class ErrorDialog extends Component {

    handlePress = () => {
        console.log('insied dialog handle press');
        const { onClose } = this.props;
        onClose();
    }

    render() {
        const { errMessage, dialog } = this.props;
        return (
                <Portal>
                    <Dialog
                        testId="errorDialog"
                        visible={dialog.errorFlag}
                    >
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            {console.log(errMessage)}
                        <Paragraph>{errMessage.errors.message}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button testID="errOkBtn" onPress={this.handlePress}>OK</Button>
                        </Dialog.Actions>

                    </Dialog>
                </Portal>
        )
    }
}