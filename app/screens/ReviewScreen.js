import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FAB, Portal } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';

import ReviewList from '../components/Reviewlist';
import {
  getReviews, postReview, editReview, deleteReview,
} from '../actions/review';
import { closeErrDialog } from '../actions/dialog';
import ErrorDialog from '../components/ErrorDialog';
import ReviewModal from '../components/ReviewModal';

class ReviewScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'reviewTab',
  };

  state = {
    currentUser: {},
    btnOpen: false,
    modalVisible: false,
    modalEdit: false,
    comment: '',
    reviewId: undefined,
    deleteConfirm: false,
    fabVisible: false,
  };

  showModal = () => this.setState({ modalVisible: true });

  showEditModal = () => this.setState({ modalEdit: true });

  hideModal = () => this.setState({ modalVisible: false, modalEdit: false, comment: '' });

  submitComment = () => {
    const { comment } = this.state;
    const { navigation, postUserComment } = this.props;
    const restaurantId = navigation.getParam('PressedItem').id;
    const data = {
      comment,
    };
    postUserComment(data, restaurantId);
    this.setState({ modalVisible: false, comment: '' });
  };

  editComment = () => {
    const { comment, reviewId } = this.state;
    const { navigation, editUserComment } = this.props;
    const restaurantId = navigation.getParam('PressedItem').id;
    const data = {
      comment,
    };

    editUserComment(data, restaurantId, reviewId);
    this.setState({ modalEdit: false, comment: '' });
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  handleEdit = (item) => {
    this.setState({ comment: item.comment, reviewId: item.id });
    this.showEditModal();
  };

  handleDelete = () => {
    const { navigation, deleteUserComment } = this.props;
    const { reviewId } = this.state;
    const restaurantId = navigation.getParam('PressedItem').id;
    deleteUserComment(restaurantId, reviewId);
    this.setState({ deleteConfirm: false, modalEdit: false });
  };

  async loadScreen() {
    const user = await AsyncStorage.getItem('currentUser');
    const { getRestReviews, restaurant } = this.props;
    this.setState({
      currentUser: JSON.parse(user),
      fabVisible: true,
    });
    getRestReviews(restaurant.singleData.id);
  }

  render() {
    const { reviews, dialog } = this.props;
    const {
      modalVisible, modalEdit, btnOpen, currentUser, deleteConfirm, fabVisible,
    } = this.state;
    return (
      <View testID="reviewScreen" style={{ flex: 1, justifyContent: 'space-evenly' }}>
        <NavigationEvents
          onWillFocus={() => this.loadScreen()}
          onWillBlur={() => this.setState({ fabVisible: false })}
        />
        {reviews.data.length > 0 ? (
          <ReviewList reviews={reviews.data} currentUser={currentUser} edit={this.handleEdit} />
        ) : (
          <Text style={{ textAlign: 'center' }}> There are no review.</Text>
        )}
        <Portal>
          <FAB.Group
            visible={fabVisible}
            open={btnOpen}
            icon={btnOpen ? 'close' : 'add'}
            actions={[
              { icon: 'add', label: 'Add a review', onPress: this.showModal },
              { icon: 'star', label: 'Give a rating', onPress: () => console.log('Pressed star') },
            ]}
            onStateChange={({ open }) => this.setState({ btnOpen: open })}
            onPress={() => {
              if (btnOpen) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
        <ReviewModal
          visible={modalEdit}
          onDismiss={this.hideModal}
          value={this.state.comment}
          onChangeText={edit => this.setState({ comment: edit })}
          onPress={this.editComment}
          onCancel={this.hideModal}
          btnLabel="Edit"
          edit
          onDelete={() => this.setState({ deleteConfirm: true })}
        />

        <ReviewModal
          visible={modalVisible}
          onDismiss={this.hideModal}
          value={this.state.comment}
          onChangeText={comment => this.setState({ comment })}
          onPress={this.submitComment}
          onCancel={this.hideModal}
          btnLabel="Comment"
        />

        <ErrorDialog
          errMessage={dialog.error}
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />
        <ErrorDialog
          errMessage="Do you really want to delete this comment?"
          errFlag={deleteConfirm}
          onDelete={this.handleDelete}
          deleteReview
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRestReviews: id => dispatch(getReviews(id)),
  postUserComment: (comment, id) => dispatch(postReview(comment, id)),
  editUserComment: (comment, restaurantId, id) => dispatch(editReview(comment, restaurantId, id)),
  deleteUserComment: (restaurantId, id) => dispatch(deleteReview(restaurantId, id)),
  errDialog: () => dispatch(closeErrDialog()),
});

const mapStateToProps = state => ({
  reviews: state.reviews,
  dialog: state.dialog,
  restaurant: state.restaurants,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewScreen);

ReviewScreen.propTypes = {
  errDialog: PropTypes.func.isRequired,
  getRestReviews: PropTypes.func.isRequired,
  reviews: PropTypes.instanceOf(Object).isRequired,
  postUserComment: PropTypes.func.isRequired,
  editUserComment: PropTypes.func.isRequired,
  deleteUserComment: PropTypes.func.isRequired,
  dialog: PropTypes.instanceOf(Object).isRequired,
  restaurant: PropTypes.instanceOf(Object).isRequired,
};
