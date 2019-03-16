import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Config from 'react-native-config';

import { getRestaurants } from '../actions/restaurant';
import { closeErrDialog } from '../actions/dialog';
import RestaurantList from '../components/Restaurantlist';
import ErrorDialog from '../components/ErrorDialog';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1E2E1',
  },
});

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HalalApp',
    tabBarTestID: 'homeTab',
    headerStyle: {
      backgroundColor: '#009165',
    },
  };

  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  handleItem = (item) => {
    const { navigation } = this.props;
    navigation.navigate('Item', { PressedItem: item });
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  render() {
    const { restaurants, dialog } = this.props;
    console.log(Config.API);
    return (
      <View testID="homeScreen" style={styles.container}>
        <RestaurantList data={restaurants.data} pressItem={this.handleItem} />
        <ErrorDialog
          errMessage={dialog.error}
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getRestaurants()),
  errDialog: () => {
    dispatch(closeErrDialog());
  },
});

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  dialog: state.dialog,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

HomeScreen.propTypes = {
  getData: PropTypes.func.isRequired,
  restaurants: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.array]),
  ).isRequired,
  dialog: PropTypes.instanceOf(Object).isRequired,
};
