import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    marginBottom: 60,
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#19647e',
    height: 50,
    justifyContent: 'center',
  },
  contenTitle: {
    color: 'white',
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
      <Card elevation={30} style={styles.card}>
        <TouchableOpacity onPress={() => this.handlePress(item)}>
          <Card.Content style={styles.content}>
            <Text style={styles.contenTitle} testID="restaurantTitle">
              {item.name}
            </Text>
          </Card.Content>
        </TouchableOpacity>
        <Card.Cover source={{ uri: picUrl + item.id }} style={styles.background} />
      </Card>
    );
  }
}

RestaurantItem.propTypes = {
  pressItem: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};
