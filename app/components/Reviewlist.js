import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import ReviewItem from './Reviewitem';

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

class ReviewList extends React.Component {
  handleEditReview = (item) => {
    const { edit } = this.props;
    edit(item);
  };

  itemKey = item => item.id.toString();

  render() {
    const { reviews, currentUser } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={reviews}
          testID="reviewList"
          keyExtractor={this.itemKey}
          renderItem={({ item }) => (
            <ReviewItem item={item} currentUser={currentUser} editReview={this.handleEditReview} />
          )}
        />
      </View>
    );
  }
}

export default ReviewList;

ReviewList.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
  edit: PropTypes.func.isRequired,
};
