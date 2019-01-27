import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getRestaurants } from '../actions/restaurant';
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
      const {navigation, getData} = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
        AsyncStorage.getItem('userToken').then(token => {
          getData(token);
        })
        
      });
      
    }
    
    

    render() {
      const { restaurants } = this.props;
      return (
        <View testID="homeScreen" style={{ flex: 1, justifyContent: 'center' }}>
          <RestaurantList data={ restaurants.data }/>
        </View>
      );
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      getData: (token) => dispatch(getRestaurants(token))
    }
  }

  const mapStateToProps = state => {
    return {
      restaurants: state.restaurants
    }
  }

  export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeScreen));
