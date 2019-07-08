import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ToggleButton } from 'react-native-paper';

const styles = StyleSheet.create({
  ToggleWrapper: {
    flexDirection: 'row',
    paddingTop: 5,
  },
});

class ListFilter extends Component {
  state = {
    value: null,
    distanceStatus: 'checked',
    latestStatus: 'unchecked',
  };

  handleChange = (value) => {
    const { handleStatus } = this.props;
    
    this.setState({ value });
    if (value === 'distance') {
      this.setState({
        distanceStatus: 'checked',
        latestStatus: 'unchecked',
      });
    }

    if (value === 'latest') {
      this.setState({
        distanceStatus: 'unchecked',
        latestStatus: 'checked',
      });
    }
    handleStatus(value);
  };

  render() {
    const { distanceStatus, latestStatus, value } = this.state;
    return (
      <View style={styles.ToggleWrapper}>
        <ToggleButton.Group onValueChange={v => this.handleChange(v)} value={value}>
          <ToggleButton icon="pin-drop" value="distance" status={distanceStatus} />
          <ToggleButton icon="access-time" value="latest" status={latestStatus} />
        </ToggleButton.Group>
      </View>
    );
  }
}

export default ListFilter;

ListFilter.propTypes = {
  handleStatus: PropTypes.func.isRequired,
};
