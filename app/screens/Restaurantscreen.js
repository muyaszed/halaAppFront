import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
// import PropTypes from 'prop-types';

class RestaurantScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { PressedItem } = navigation.state.params;
    return {
      title: PressedItem.name,
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
      >
        <Text>Menu</Text>
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
  }
}

export default RestaurantScreen;

// RestaurantScreen.propTypes = {
//   navigation: PropTypes.objectOf(
//     PropTypes.oneOfType([
//       PropTypes.func
//     ])
//   ).isRequired,
// };
