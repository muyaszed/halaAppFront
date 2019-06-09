import React, { Component } from 'react';
import {
  StyleSheet, TouchableOpacity, Text, Image,
} from 'react-native';
import { List, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  list: {
    borderWidth: 0.5,
  },
  editIcon: {
    position: 'relative',
    top: 5,
  },
  content: {},
  contenTitle: {},
  background: {},
});

export default class RestaurantCountItem extends Component {
  handleOnPress = (item) => {
    const { handlePress } = this.props;
    handlePress(item);
  };

  pressItem = (item) => {
    const { handlePressItem } = this.props;
    handlePressItem(item);
  };

  render() {
    const { item, navigation, icon } = this.props;
    const coverImage = item.cover_uri || 'https://robohash.org/cafe?set=set1';
    console.log(item);
    return (
      <List.Item
        style={styles.list}
        title={item.name}
        left={props => (
          <TouchableOpacity onPress={() => this.pressItem(item)}>
            <Image style={{ width: 50, height: 40 }} source={{ uri: coverImage }} />
          </TouchableOpacity>
        )}
        right={props => (
          <Icon
            name={icon}
            size={30}
            color="#009165"
            style={styles.editIcon}
            onPress={() => this.handleOnPress(item)}
          />
        )}
      />
    );
  }
}

RestaurantCountItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  handlePress: PropTypes.func.isRequired,
  handlePressItem: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};
