import React from 'react';
import { View, Text } from 'react-native';
// import { Button } from 'react-native-paper';
// import PropTypes from 'prop-types';

class MapScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'mapTab',
  };

  render() {
    return (
      <View>
        <Text>This is Map</Text>
      </View>
    );
  }
}

export default MapScreen;
