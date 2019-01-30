import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addRestaurant } from '../actions/restaurant';
import { closeErrDialog } from '../actions/dialog';
import NewRestaurantForm from '../components/Newrestaurantform';
import ErrorDialog from '../components/ErrorDialog';

class AddScreen extends Component {
    static navigationOptions = {
      tabBarTestID: 'addTab'
    };

    handleAdd = (data) => {
      this.props.add(data);
      
    }

    handleClose = () => {
      this.props.closeErrDialog();
    }
  
    render() {
      const { restaurant, dialog } = this.props;
      return (
        <View testID="addScreen" style={{ flex: 1, justifyContent: 'center'}}>
          <ErrorDialog errMessage={restaurant} dialog={dialog} onClose={this.handleClose}/>
          <NewRestaurantForm onAdd={this.handleAdd}/>
        </View> 
      );
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
      add: (data) => {
        dispatch(addRestaurant(data))
      },
      closeErrDialog: () => {
        dispatch(closeErrDialog())
      }
    }
  }

  const mapStateToProps = state => {
    return {
        restaurant: state.restaurants,
        dialog: state.dialog
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);