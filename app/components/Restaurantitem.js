import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default class RestaurantItem extends Component {
  constructor(props) {
    super(props);
    this.handleOnPress = this.handleClick.bind(this);
  }

  handleOnPress = (item) => {
    const { pressItem } = this.props;
    pressItem(item);
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress(item)}>
        <Card elevation={30} style={styles.card}>
          <Card.Content>
            <Title testID="restaurantTitle">{item.name}</Title>
            <Text>{item.location}</Text>
            <Text>{item.category}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }
}

RestaurantItem.propTypes = {
  pressItem: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.string).isRequired,
};
