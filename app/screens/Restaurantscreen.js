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
  };

  handleBookmark = (status) => {
    const { bookmark, unbookmark, navigation } = this.props;
    const { currentUser } = this.state;
    const PressedItem = navigation.getParam('PressedItem');

    if (status === 'bookmark') {
      bookmark(PressedItem.id, currentUser.id).then(() => {
        this.setState({ checkedByCurrentUser: true });
      });
    } else if (status === 'unbookmark') {
      unbookmark(PressedItem.id, currentUser.id).then(() => {
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
    const { checkedByCurrentUser } = this.state;
    const coverImage = PressedItem.cover_uri || 'https://robohash.org/cafe?set=set1';

    return (
      <View testID="restaurantScreen" style={styles.container}>
        <NavigationEvents onDidFocus={() => this.loadScreen()} />
        <View>
          <BookmarkButton
            checkedBy={checkedByCurrentUser}
            handleBookmark={status => this.handleBookmark(status)}
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
};
