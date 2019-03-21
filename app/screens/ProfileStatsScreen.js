import React from 'react';
import {
  View, StyleSheet, Text, ScrollView,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  NavigationEvents,
} from 'react-navigation';
import RestaurantsCountScreen from './Restaurantscountscreen';
import ReviewsCountScreen from './Reviewscountscreen';
import CheckinsCountScreen from './Checkinscountscreen';
import BookmarksCountScreen from './Bookmarkscountscreen';
import PointsCountScreen from './Pointscountscreen';
import AddScreen from './Addscreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  wrapper: {
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
  },
  avatar: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: '#009165',
  },
});

const StatsNavigator = createMaterialTopTabNavigator(
  {
    RestaurantsCount: RestaurantsCountScreen,
    ReviewsCount: ReviewsCountScreen,
    CheckinsCount: CheckinsCountScreen,
    BookmarkCount: BookmarksCountScreen,
    PointsCount: PointsCountScreen,
  },
  {
    tabBarOptions: {
      // showLabel: false,
      showIcon: true,
      style: {
        // height: 100,
        backgroundColor: 'transparent',
      },
      iconStyle: {
        height: 50,
      },
      indicatorStyle: {
        backgroundColor: '#009165',
      },
      labelStyle: {
        color: 'black',
      },
    },
  },
);


class ProfileStatsScreen extends React.Component {
  static router = StatsNavigator.router;

  static navigationOptions = {
    tabBarTestID: 'profileStatsTab',
    tabBarLabel: 'Statistic',
  };

  render() {
    const { navigation, user } = this.props;
    const reviewsQty = user && Object.keys(user).length !== 0 ? user.reviews.length : 0;
    const restaurantsQty = user && Object.keys(user).length !== 0 ? user.restaurants.length : 0;
    console.log('totla reviews', reviewsQty);
    return (
      // <View>
      // {/* <NavigationEvents onWillFocus={payload => console.log('will focus', payload)} /> */}
      <StatsNavigator navigation={navigation} screenProps={{ user, restaurantsQty, reviewsQty }} />
      // <CountStack navigation={navigation} screenProps={{ restaurantsQty, reviewsQty }} />
      // {/* <OtherStatsStack navigation={navigation} /> */}
      // </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default connect(mapStateToProps)(ProfileStatsScreen);

ProfileStatsScreen.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};
