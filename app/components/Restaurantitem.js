import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Card, Title, Chip } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,

    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  content: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#19647e',
    height: 60,
    paddingRight: 10,
    // justifyContent: 'center',
  },
  contenTitle: {
    color: 'white',
  },
  background: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 150,
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
    const coverImage = item.cover_uri || 'https://robohash.org/cafe?set=set1';
    console.log(item);
    return (
      <Card elevation={30} style={styles.card}>
        <TouchableOpacity onPress={() => this.handlePress(item)}>
        <Card.Title style={styles.content} titleStyle={styles.contenTitle} title={`${item.name} \u{003E}`}  right={(props) => <Chip icon="collections-bookmark" >{item.bookmarking_user.length}</Chip>} />
          {/* <Card.Content style={styles.content}>
            <Text style={styles.contenTitle} testID="restaurantTitle">
              {`${item.name} \u{003E}`}
            </Text>
          </Card.Content> */}
        </TouchableOpacity>
        <Card.Cover source={{ uri: coverImage }} style={styles.background} resizeMode="cover" />
      </Card>
    );
  }
}

RestaurantItem.propTypes = {
  pressItem: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};
