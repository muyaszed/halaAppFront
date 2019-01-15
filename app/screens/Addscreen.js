import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NewRestaurantForm from '../components/Newrestaurantform';

export default class AddScreen extends Component {
    static navigationOptions = {
      tabBarTestID: 'addTab'
    };

    handleAdd = (data) => {
      
      return fetch('http://localhost:3000/restaurants', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }).then(res => {
        this.props.navigation.navigate('Home');
      }).catch(error => {
        console.log(error);
      })
      
    }
  
    render() {
      return (
        <View testID="addScreen" style={{ flex: 1, justifyContent: 'center'}}>
          <NewRestaurantForm onAdd={this.handleAdd}/>
        </View> 
      );
    }
  }