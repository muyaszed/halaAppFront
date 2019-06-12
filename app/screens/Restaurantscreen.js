import React from 'react';
import {
  View, Text, StyleSheet, Image, AsyncStorage,
} from 'react-native';
import {
  Card, Title, Paragraph, Divider, Button,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import BookmarkButton from '../components/BookmarkButton';
import CheckinButton from '../components/CheckinButton';
import { bookmarkRestaurant, unbookmarkRestaurant } from '../actions/restaurant';

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: -30,
    height: 200,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 300,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  divider: {
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 2,
  },
  topButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

class RestaurantScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // const item = navigation.getParam('PressedItem');
    const headerTitle = 'My ttile';

    return {
      headerTitle,
      tabBarTestID: 'detailTab',
      headerStyle: {
        backgroundColor: '#009165',
      },
      headerBackTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
    };
  };

  state = {
    currentUser: {},
    checkedByCurrentUser: false,
    allowCheckin: false,
  };

  deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  }

  calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    }
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c; // Distance in km
    return dist;
  };

  checkUserDistance = () => {
    const { restaurant } = this.props;
    const options = {
      enableHighAccuracy: false,
      timeout: 200000,
      maximumAge: 1000,
    };
    const getPosition = function(options){
      return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }
   
    getPosition(options).then((position) => {
      const userDistance = this.calculateDistance(
        position.coords.latitude,
        position.coords.longitude,
        restaurant.singleData.latitude,
        restaurant.singleData.longitude,
        'k',
      );
      if ( userDistance <= 0.1 ) {
        this.setState({ allowCheckin: true });
      } else {
        this.setState({ allowCheckin: false });
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  checkCurrentUser = (item) => {
    const { currentUser } = this.state;
    const bookmarks = item.bookmarking_user;
    const check = bookmarks.filter(bookmark => bookmark.id === currentUser.id);
    if (check.length > 0) {
      this.setState({ checkedByCurrentUser: true });
    } else {
      this.setState({ checkedByCurrentUser: false });
    }
    this.checkUserDistance();
  };

  handleBookmark = (status) => {
    const { bookmark, unbookmark, restaurant } = this.props;
    const { currentUser } = this.state;

    if (status === 'bookmark') {
      bookmark(restaurant.singleData.id, currentUser.id).then(() => {
        this.setState({ checkedByCurrentUser: true });
      });
    } else if (status === 'unbookmark') {
      unbookmark(restaurant.singleData.id, currentUser.id).then(() => {
        this.setState({ checkedByCurrentUser: false });
      });
    }
  };

  async loadScreen() {
    const { restaurant } = this.props;
    const user = await AsyncStorage.getItem('currentUser');
    this.setState({
      currentUser: JSON.parse(user),
    });
    this.checkCurrentUser(restaurant.singleData);
  }

  render() {
    const { navigation, restaurant } = this.props;
    const PressedItem = restaurant.singleData;
    const { checkedByCurrentUser, allowCheckin } = this.state;
    const coverImage = PressedItem.cover_uri || 'https://robohash.org/cafe?set=set1';

    return (
      <View testID="restaurantScreen" style={styles.container}>
        <NavigationEvents onDidFocus={() => this.loadScreen()} />
        <View style={styles.topButton}>
          <BookmarkButton
            checkedBy={checkedByCurrentUser}
            handleBookmark={status => this.handleBookmark(status)}
          />
          <CheckinButton
            handleBookmark={status => this.handleBookmark(status)}
            disabled={!allowCheckin}
          />
        </View>
        <View style={styles.header}>
          <Image style={styles.bgImage} source={{ uri: coverImage }} />
        </View>
        <Card elevation={30} style={styles.card}>
          <Card.Content style={styles.content}>
            <Paragraph>{PressedItem.desc}</Paragraph>
            <Divider style={styles.divider} inset />
            <Title testID="restaurantLocation">Location</Title>
            <Paragraph>{PressedItem.location}</Paragraph>
            <Divider style={styles.divider} inset />
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  bookmark: (restaurantId, userId) => dispatch(bookmarkRestaurant(restaurantId, userId)),
  unbookmark: (restaurantId, userId) => dispatch(unbookmarkRestaurant(restaurantId, userId)),
});

const mapStateToProps = state => ({
  restaurant: state.restaurants,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantScreen);

RestaurantScreen.propTypes = {
  restaurant: PropTypes.instanceOf(Object).isRequired,
  bookmark: PropTypes.func.isRequired,
  unbookmark: PropTypes.func.isRequired,
};
