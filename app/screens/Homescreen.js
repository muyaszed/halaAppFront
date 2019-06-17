import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import Config from 'react-native-config';

import { getRestaurants, showRestaurant } from '../actions/restaurant';
import { filterByDistance, filterByLatest } from '../actions/filterRestaurant';
import { closeErrDialog } from '../actions/dialog';
import RestaurantList from '../components/Restaurantlist';
import ErrorDialog from '../components/ErrorDialog';
import ListFilter from '../components/ListFilter';

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
    this.getList();
  }

  handleItem = (id) => {
    const { navigation, showRestaurantDetail } = this.props;
    showRestaurantDetail(id);
    setTimeout(() => {
      navigation.navigate('Item');
    }, 400);
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  handleStatus = (status) => {
    this.getList(status);
  };

  getList = (status = 'distance') => {
    const { getData } = this.props;
    getData();
    setTimeout(() => this.filterList(status), 1200);
  };

  filterList = (status) => {
    const { restaurants, filterDataByDistance, filterDataByLatest } = this.props;
    if (status === 'distance') {
      console.log('get list distance');
      filterDataByDistance(restaurants.data);
    }

    if (status === 'latest') {
      console.log('get list latest');
      filterDataByLatest(restaurants.data);
    }
  };

  render() {
    const { restaurants, dialog, list } = this.props;
    console.log('list', list);
    return (
      <View testID="homeScreen" style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getList()} />
        <ListFilter handleStatus={this.handleStatus} />
        <RestaurantList data={list.filteredData} pressItem={this.handleItem} />
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
  showRestaurantDetail: restaurantId => dispatch(showRestaurant(restaurantId)),
  filterDataByDistance: list => dispatch(filterByDistance(list)),
  filterDataByLatest: list => dispatch(filterByLatest(list)),
});

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  dialog: state.dialog,
  list: state.filteredList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

HomeScreen.propTypes = {
  getData: PropTypes.func.isRequired,
  restaurants: PropTypes.instanceOf(Object).isRequired,
  list: PropTypes.instanceOf(Object).isRequired,
  dialog: PropTypes.instanceOf(Object).isRequired,
  showRestaurantDetail: PropTypes.func.isRequired,
  filterDataByDistance: PropTypes.func.isRequired,
  filterDataByLatest: PropTypes.func.isRequired,
};
