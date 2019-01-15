import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import RestaurantList from '../components/Restaurantlist';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    static navigationOptions = {
      tabBarTestID: 'homeTab'
    };

    componentDidMount() {
      const {navigation} = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
        return fetch('http://localhost:3000/restaurants')
        .then(response => response.json())
        .then(resJson => {
          this.setState({
            data: resJson
          })
        });
      });
      
    }
  
    render() {
      return (
        <View testID="homeScreen" style={{ flex: 1, justifyContent: 'center' }}>
          <RestaurantList data={this.state.data }/>
        </View>
      );
    }
  }

  export default withNavigation(HomeScreen);
