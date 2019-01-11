import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NewRestaurantForm from '../components/Newrestaurantform';

export default class AddScreen extends Component {
    static navigationOptions = {
      tabBarTestID: 'addTab'
    };

    handleAdd = (data) => {
      this.props.navigation.navigate('Home');
    }
  
    render() {
      return (
        <View testID="addScreen" style={{ flex: 1, justifyContent: 'center'}}>
          <NewRestaurantForm onAdd={this.handleAdd}/>
        </View> 
      );
    }
  }