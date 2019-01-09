import React, { Component } from 'react';
import { View, Text } from 'react-native';

import RestaurantList from '../components/Restaurantlist';

export default class HomeScreen extends Component {
    static navigationOptions = {
      tabBarTestID: 'homeTab'
    };
  
    render() {
      return (
        <View testID="homeScreen" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <RestaurantList />
        </View>
      );
    }
  }

