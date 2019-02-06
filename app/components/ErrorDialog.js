import React, { Component } from "react";
import { Dialog, Portal, Paragraph, Button } from 'react-native-paper';

class ErrorDialog extends Component {
    constructor(props) {
        super(props);
    
    }


    handlePress = () => {
        console.log('insied dialog handle press');
        const { onClose } = this.props;
        onClose();
    }

    render() {
        const { errMessage, dialog } = this.props;
        return (
                
                <Portal testID="errorDialog">
                    <Dialog
                        
                        visible={dialog.errorFlag}
                    >
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            {console.log(errMessage.errors)}
                        <Paragraph testID='errorMessage'>{errMessage.errors.message}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button testID="errOkBtn" onPress={this.handlePress}>OK</Button>
                        </Dialog.Actions>

                    </Dialog>
                </Portal>
                
        )
    }
}

export default ErrorDialog;