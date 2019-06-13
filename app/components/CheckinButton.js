import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

class CheckinButton extends Component {
  handlePress = () => {
    const { handleCheckin } = this.props;
    handleCheckin();
  };

  render() {
    const { disabled } = this.props;
    return (
      <View testID="buttonWrapper">
        <Button
          testID="checkinButton"
          icon="check"
          mode="outlined"
          onPress={() => this.handlePress()}
          disabled={disabled}
        >
          Check-in
        </Button>
      </View>
    );
  }
}

export default CheckinButton;

CheckinButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleCheckin: PropTypes.func.isRequired,
};
