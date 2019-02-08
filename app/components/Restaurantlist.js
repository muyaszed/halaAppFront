import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import RestaurantItem from './Restaurantitem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default class RestaurantList extends Component {
  handlePressItem = (item) => {
    const { pressItem } = this.props;
    pressItem(item);
  };

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          testID="restaurantList"
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <RestaurantItem item={item} pressItem={this.handlePressItem} />
          )}
        />
      </View>
    );
  }
}

RestaurantList.propTypes = {
  pressItem: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
