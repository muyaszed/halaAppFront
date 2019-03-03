import React from 'react';
import {
  View, StyleSheet, Text, ScrollView,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

class ProfileStatsScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'profileStatsTab',
    tabBarLabel: 'Statistic',
  };

  render() {
    const { user } = this.props;
    const reviewsQty = user && Object.keys(user).length !== 0 ? user.reviews.length : 0;
    const restaurantsQty = user && Object.keys(user).length !== 0 ? user.restaurants.length : 0;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Avatar.Icon size={57} icon="restaurant" color="#009165" style={styles.avatar} />
            <Text>Restaurants</Text>
            <Text>{restaurantsQty}</Text>
          </View>
          <View style={styles.wrapper}>
            <Avatar.Icon size={57} icon="edit" color="#009165" style={styles.avatar} />
            <Text>Reviews</Text>
            <Text>{reviewsQty}</Text>
          </View>
          <View style={styles.wrapper}>
            <Avatar.Icon size={57} icon="restaurant" color="#009165" style={styles.avatar} />
            <Text>Check-ins</Text>
            <Text>{restaurantsQty}</Text>
          </View>
          <View style={styles.wrapper}>
            <Avatar.Icon size={57} icon="edit" color="#009165" style={styles.avatar} />
            <Text>Bookmark</Text>
            <Text>{reviewsQty}</Text>
          </View>
          <View style={styles.wrapper}>
            <Avatar.Icon size={57} icon="folder" color="#009165" style={styles.avatar} />
            <Text>Points</Text>
            <Text>100</Text>
          </View>
        </View>
      </ScrollView>
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
