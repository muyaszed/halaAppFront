import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import {
  Card, Avatar, Paragraph, IconButton, Colors,
} from 'react-native-paper';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default class ReviewItem extends Component {
  getInitial = (user) => {
    const initital = user.first_name.split('')[0] + user.last_name.split('')[0];

    return initital;
  };

  handlePress = () => {
    const { editReview, item } = this.props;
    editReview(item);
  };

  render() {
    const { item, currentUser } = this.props;
    console.log(currentUser, item.user);
    return (
      <Card testID="reviewItem" elevation={30} style={styles.card}>
        <Card.Title
          left={props => (
            <Avatar.Text {...props} label={this.getInitial(item.user)} testID="userReviewAvatar" />
          )}
          right={() => (currentUser.id === item.user.id ? (
            <IconButton icon="edit" onPress={this.handlePress} />
          ) : null)
          }
        />
        <Card.Content style={styles.content}>
          <Paragraph testID="userReviewComment">{item.comment}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

ReviewItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
  editReview: PropTypes.func.isRequired,
};
