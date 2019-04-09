import React from 'react';
import {
  View, FlatList, StyleSheet, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Avatar, Title, Portal, Modal,
} from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ReviewCountItem from '../components/Reviewcountitem';
import EditReviewForm from '../components/EditReviewForm';

import { editReview } from '../actions/review';
import { getCurrentUser } from '../config/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleWrapper: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: '#009165',
  },
  contentContainerStyle: {
    paddingTop: 100,
    paddingBottom: 100,
    backgroundColor: 'grey',
  },
});

class ReviewsCountScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    console.log(screenProps);
    return {
      tabBarLabel: screenProps.reviewsQty.toString(),
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.wrapper}>
          <Avatar.Icon size={57} icon="edit" color="#009165" style={styles.avatar} />
        </View>
      ),
    };
  };

  state = {
    showModal: false,
    pressedItem: {},
  };

  handlePress = (item) => {
    this.setState({ showModal: true, pressedItem: item });
  };

  handleEdit = async (comment) => {
    const currentUser = await getCurrentUser();
    const userId = JSON.parse(currentUser).id;
    const { editUserComment } = this.props;
    const { pressedItem } = this.state;
    this.setState({ showModal: false });
    const data = {
      comment,
    };
    editUserComment(data, pressedItem.restaurant_id, pressedItem.id, userId);
  };

  itemKey = item => JSON.stringify(item.id);

  render() {
    const { showModal, pressedItem } = this.state;
    const { navigation, screenProps, dialog } = this.props;
    const { reviews } = screenProps.user;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Title>Your Review list</Title>
        </View>

        <FlatList
          testID="reviewCountList"
          data={reviews}
          keyExtractor={this.itemKey}
          renderItem={({ item }) => (
            <ReviewCountItem item={item} handlePress={this.handlePress} navigation={navigation} />
          )}
        />
        <Portal>
          <Modal
            contentContainerStyle={styles.contentContainerStyle}
            visible={showModal}
            onDismiss={this.hideModal}
            dismissable={false}
          >
            <EditReviewForm
              item={pressedItem}
              onEdit={this.handleEdit}
              onCancel={() => this.setState({ showModal: false })}
            />
          </Modal>
        </Portal>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  editUserComment: (comment, restaurantId, id, userId) => dispatch(editReview(comment, restaurantId, id, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewsCountScreen);

ReviewsCountScreen.propTypes = {
  screenProps: PropTypes.instanceOf(Object).isRequired,
  editUserComment: PropTypes.func.isRequired,
};
