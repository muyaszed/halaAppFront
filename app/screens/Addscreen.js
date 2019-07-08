import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addRestaurant } from '../actions/restaurant';
import { closeErrDialog } from '../actions/dialog';
import NewRestaurantForm from '../components/Newrestaurantform';
import ErrorDialog from '../components/ErrorDialog';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#E1E2E1',
  },
});

class AddScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const prevScreen = navigation.getParam('prevScreen');
    
    return {
      tabBarTestID: prevScreen === 'RestaurantsCount' ? 'editRestaurant' : 'addTab',
      tabBarLabel: '',
      title: prevScreen === 'RestaurantsCount' ? 'Edit your restaurant' : 'Add new Restaurant',
      headerStyle: {
        backgroundColor: '#009165',
      },
    };
  };

  handleAdd = (data) => {
    const { add } = this.props;
    return add(data);
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  render() {
    const { restaurant, dialog, navigation } = this.props;

    return (
      <SafeAreaView testID="addScreen" style={styles.container}>
        <ErrorDialog
          errMessage={dialog.error}
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />
        <NewRestaurantForm
          onAdd={this.handleAdd}
          navigation={navigation}
          clearForm={!dialog.errorFlag}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  add: data => dispatch(addRestaurant(data)),
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
  dialog: PropTypes.instanceOf(Object).isRequired,
};
