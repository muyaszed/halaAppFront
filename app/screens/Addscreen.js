import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addRestaurant } from '../actions/restaurant';

import NewRestaurantForm from '../components/Newrestaurantform';

class AddScreen extends Component {
    static navigationOptions = {
      tabBarTestID: 'addTab'
    };

    handleAdd = (data) => {
      this.props.add(data);
      
    }
  
    render() {
      return (
        <View testID="addScreen" style={{ flex: 1, justifyContent: 'center'}}>
          <NewRestaurantForm onAdd={this.handleAdd}/>
        </View> 
      );
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
      add: (data) => {
        dispatch(addRestaurant(data))
      }
    }
  }

export default connect(undefined, mapDispatchToProps)(AddScreen);