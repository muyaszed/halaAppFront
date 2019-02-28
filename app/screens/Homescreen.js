import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Config from 'react-native-config'

import { getRestaurants } from '../actions/restaurant';
import RestaurantList from '../components/Restaurantlist';

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarTestID: 'homeTab',
  };

  componentDidMount() {
    const { navigation, getData } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      getData();
    });
  }

  handleItem = (item) => {
    const { navigation } = this.props;
    navigation.navigate('Item', { PressedItem: item });
  };

  render() {
    const { restaurants } = this.props;
    console.log(Config.API);
    return (
      <View testID="homeScreen" style={{ flex: 1, justifyContent: 'center' }}>
        <RestaurantList data={restaurants.data} pressItem={this.handleItem} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getRestaurants()),
});

const mapStateToProps = state => ({
  restaurants: state.restaurants,
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
};
