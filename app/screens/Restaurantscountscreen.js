import React from 'react';
import {
  ScrollView, View, Text, StyleSheet, FlatList, Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Avatar, Title, Portal, Modal, TextInput,
} from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RestaurantCountItem from '../components/Restaurantcountitem';
import EditRestaurantForm from '../components/EditRestaurantForm';
import ErrorDialog from '../components/ErrorDialog';
import { editRestaurant, showRestaurant } from '../actions/restaurant';
import { getCurrentUser } from '../config/helpers';
import { closeErrDialog } from '../actions/dialog';

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

class RestaurantsCountScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    
    return {
      tabBarLabel: screenProps.restaurantsQty.toString(),
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.wrapper}>
          <Avatar.Icon size={57} icon="restaurant" color="#009165" style={styles.avatar} />
        </View>
      ),
    };
  };

  state = {
    showModal: false,
    pressedItem: {},
  };

  hideModal = () => this.setState({ showModal: false });

  showModal = () => this.setState({ showModal: true });

  handlePress = (item) => {
    this.showModal();
    this.setState({ pressedItem: item });
  };

  handleEdit = async (item) => {
    const currentUser = await getCurrentUser();
    const userId = JSON.parse(currentUser).id;
    const { editRestaurantData } = this.props;
    const { pressedItem } = this.state;
    editRestaurantData(item, pressedItem.id, userId).then((res) => {
      
      if (!res) {
        this.hideModal();
      }
    });
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  handlePressItem = (item) => {
    const { navigation, showRestaurantDetail } = this.props;
    showRestaurantDetail(item.id);
    setTimeout(() => {
      navigation.navigate('Item');
    }, 300);
  };

  itemKey = item => JSON.stringify(item.id);

  render() {
    const {
      navigation, screenProps, dialog,
    } = this.props;
    const { showModal, pressedItem } = this.state;
    const name = screenProps.user && Object.keys(screenProps.user).length !== 0
      ? screenProps.user.profile.first_name
      : '';
    const { restaurants } = screenProps.user;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Title>
            {name}
            &lsquo;s Restaurant List
          </Title>
        </View>

        <FlatList
          testID="restaurantCountList"
          data={restaurants}
          keyExtractor={this.itemKey}
          renderItem={({ item }) => (
            <RestaurantCountItem
              icon="edit"
              item={item}
              handlePress={this.handlePress}
              handlePressItem={this.handlePressItem}
              navigation={navigation}
            />
          )}
        />
        <Portal>
          <Modal
            contentContainerStyle={styles.contentContainerStyle}
            visible={showModal}
            onDismiss={this.hideModal}
            dismissable={false}
          >
            <EditRestaurantForm
              item={pressedItem}
              onEdit={this.handleEdit}
              onCancel={this.hideModal}
            />
          </Modal>
        </Portal>
        <ErrorDialog
          errMessage={dialog.error}
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  dialog: state.dialog,
});

const mapDispatchToProps = dispatch => ({
  editRestaurantData: (data, id, userId) => dispatch(editRestaurant(data, id, userId)),
  errDialog: () => {
    dispatch(closeErrDialog());
  },
  showRestaurantDetail: restaurantId => dispatch(showRestaurant(restaurantId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantsCountScreen);

RestaurantsCountScreen.propTypes = {
  dialog: PropTypes.instanceOf(Object).isRequired,
  editRestaurantData: PropTypes.func.isRequired,
  showRestaurantDetail: PropTypes.func.isRequired,
  errDialog: PropTypes.func.isRequired,
  screenProps: PropTypes.instanceOf(Object).isRequired,
};
