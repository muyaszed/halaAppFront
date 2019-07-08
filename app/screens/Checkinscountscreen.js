import React from 'react';
import {
  View, ScrollView, StyleSheet, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RestaurantCountItem from '../components/Restaurantcountitem';

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

class CheckinsCountScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    
    return {
      tabBarLabel: screenProps.checkedIns.toString(),
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.wrapper}>
          <Avatar.Icon size={57} icon="check" color="#009165" style={styles.avatar} />
        </View>
      ),
    };
  };

  itemKey = (item, index) => index.toString();

  render() {
    const { screenProps } = this.props;
    const { checkinlist } = screenProps.user;
    const name = screenProps.user && Object.keys(screenProps.user).length !== 0
      ? screenProps.user.profile.first_name
      : '';
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Title>
            {name}
            &lsquo;s Check-in List
          </Title>
        </View>

        <FlatList
          testID="restaurantCountList"
          data={checkinlist}
          keyExtractor={this.itemKey}
          renderItem={({ item }) => (
            <RestaurantCountItem item={item.detail} type="checkin" date={item.date} />
          )}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default connect(mapStateToProps)(CheckinsCountScreen);

CheckinsCountScreen.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};
