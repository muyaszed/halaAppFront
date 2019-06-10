import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RestaurantCountItem from '../components/Restaurantcountitem';
import { showRestaurant, unbookmarkRestaurant } from '../actions/restaurant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleWrapper: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: '#009165',
  },
  contentContainerStyle: {
    paddingTop: 100,
    paddingBottom: 100,
    backgroundColor: 'grey',
  },
});

class BookmarksCountScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => ({
    tabBarLabel: screenProps.bookmarked.toString(),
    tabBarIcon: ({ tintColor }) => (
      <View style={styles.wrapper}>
        <Avatar.Icon size={57} icon="collections-bookmark" color="#009165" style={styles.avatar} />
      </View>
    ),
  });

  handlePress = (item) => {
    const { screenProps, unbookmark } = this.props;
    unbookmark(item.id, screenProps.user.id);
  };

  handlePressItem = (item) => {
    // const { navigation, showRestaurantDetail, restaurant } = this.props;
    // showRestaurantDetail(item.id).then(() => {
    //   navigation.navigate('Item', { PressedItem: restaurant });
    // });
    const { navigation, showRestaurantDetail } = this.props;
    showRestaurantDetail(item.id);
    setTimeout(() => {
      navigation.navigate('Item');
    }, 300);
  };

  itemKey = item => JSON.stringify(item.id);

  render() {
    const { navigation, screenProps } = this.props;
    const name = screenProps.user && Object.keys(screenProps.user).length !== 0
      ? screenProps.user.profile.first_name
      : '';
    const { bookmarked_restaurant } = screenProps.user;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Title>
            {name}
            &lsquo;s Bookmark List
          </Title>
        </View>

        <FlatList
          testID="restaurantCountList"
          data={bookmarked_restaurant}
          keyExtractor={this.itemKey}
          renderItem={({ item }) => (
            <RestaurantCountItem
              icon="times"
              item={item}
              handlePress={this.handlePress}
              handlePressItem={this.handlePressItem}
              navigation={navigation}
            />
          )}
        />
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showRestaurantDetail: id => dispatch(showRestaurant(id)),
  unbookmark: (restaurantId, userId) => dispatch(unbookmarkRestaurant(restaurantId, userId)),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(BookmarksCountScreen);

BookmarksCountScreen.propTypes = {
  screenProps: PropTypes.instanceOf(Object).isRequired,
  showRestaurantDetail: PropTypes.func.isRequired,
  unbookmark: PropTypes.func.isRequired,
};
