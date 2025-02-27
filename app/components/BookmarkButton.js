import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

class BookmarkButton extends Component {
  handlePress = (e, status) => {
    const { handleBookmark } = this.props;

    handleBookmark(status);
  };

  render() {
    const { checkedBy } = this.props;

    return (
      <View testID="buttonWrapper">
        {checkedBy ? (
          <Button
            testID="unbookmarkButton"
            icon="collections-bookmark"
            mode="outlined"
            compact
            onPress={e => this.handlePress(e, 'unbookmark')}
          >
            Unbookmark
          </Button>
        ) : (
          <Button
            testID="bookmarkButton"
            icon="collections-bookmark"
            mode="outlined"
            onPress={e => this.handlePress(e, 'bookmark')}
          >
            Bookmark
          </Button>
        )}
      </View>
    );
  }
}

export default BookmarkButton;

BookmarkButton.propTypes = {
  checkedBy: PropTypes.bool.isRequired,
};
