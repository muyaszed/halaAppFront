import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
// import PropTypes from 'prop-types';

const MapScreen = (props) => {
  const { navigation } = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
      }}
    >
      <Text>Map</Text>
      <Button
        onPress={() => {
          navigation.navigate('Menu');
        }}
        style={{ width: '33.33%' }}
        mode="text"
      >
        Menu
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('Review');
        }}
        style={{ width: '33.33%' }}
        mode="text"
      >
        Review
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('Map');
        }}
        style={{ width: '33.33%' }}
        mode="text"
      >
        Map
      </Button>

      <View />
    </View>
  );
};

export default MapScreen;

// MapScreen.propTypes = {
//   navigation: PropTypes.objectOf(
//     PropTypes.oneOfType([
//       PropTypes.func
//     ])
//   ).isRequired,
// };
