import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestaurant } from '../actions/restaurant';
import { closeErrDialog } from '../actions/dialog';
import NewRestaurantForm from '../components/Newrestaurantform';
import ErrorDialog from '../components/ErrorDialog';

class AddScreen extends Component {
  static navigationOptions = {
    tabBarTestID: 'addTab',
    
  };

  handleAdd = (data) => {
    const { add } = this.props;
    add(data);
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  render() {
    const { restaurant, dialog } = this.props;
    return (
      <View testID="addScreen" style={{ flex: 1, justifyContent: 'center' }}>
        <ErrorDialog
          errMessage={restaurant.errors}
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />
        <NewRestaurantForm onAdd={this.handleAdd} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  add: (data) => {
    dispatch(addRestaurant(data));
  },
  errDialog: () => {
    dispatch(closeErrDialog());
  },
});

const mapStateToProps = state => ({
  restaurant: state.restaurants,
  dialog: state.dialog,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddScreen);

AddScreen.propTypes = {
  add: PropTypes.func.isRequired,
  errDialog: PropTypes.func.isRequired,
  restaurant: PropTypes.instanceOf(Object).isRequired,
  dialog: PropTypes.objectOf(PropTypes.bool).isRequired,
};
