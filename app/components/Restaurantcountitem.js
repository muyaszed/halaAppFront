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

  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <List.Item
        style={styles.list}
        title={item.name}
        left={props => <Image style={{ width: 50, height: 40 }} source={{ uri: item.cover_uri }} />}
        right={props => (
          <Icon
            name="edit"
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
};
