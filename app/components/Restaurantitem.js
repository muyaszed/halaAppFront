import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    marginBottom: 60,
    marginLeft: 10,
    marginRight: 10,
    height: 200,
  },
  content: {
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  background: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default class RestaurantItem extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress = (item) => {
    const { pressItem } = this.props;
    pressItem(item);
  };

  render() {
    const { item } = this.props;
    const picUrl = 'https://loremflickr.com/320/240/restaurant,cafe/all?random=';
    return (
      <TouchableOpacity onPress={() => this.handlePress(item)}>
        <Card elevation={30} style={styles.card}>
          <Card.Content style={styles.content}>
            <Title testID="restaurantTitle">{item.name}</Title>
          </Card.Content>
          <Card.Cover source={{ uri: picUrl + item.id }} style={styles.background} />
        </Card>
      </TouchableOpacity>
    );
  }
}

RestaurantItem.propTypes = {
  pressItem: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};
