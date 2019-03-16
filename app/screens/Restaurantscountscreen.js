import React from 'react';
import {
  ScrollView, View, Text, StyleSheet, FlatList, Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Avatar, Title, Portal, Modal, TextInput
} from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RestaurantCountItem from '../components/Restaurantcountitem';
import EditRestaurantForm from '../components/EditRestaurantForm';

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
});

class RestaurantsCountScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    console.log(screenProps);
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

  handleEdit = () => {

  };

  itemKey = item => JSON.stringify(item.id);

  render() {
    const { user, navigation, dialog } = this.props;
    const { showModal, pressedItem } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Title>Your Restaurant list</Title>
        </View>

        <FlatList
          testID="restaurantCountList"
          data={user.restaurants}
          keyExtractor={this.itemKey}
          renderItem={({ item }) => (
            <RestaurantCountItem item={item} handlePress={this.handlePress} />
          )}
        />
        <Portal>
          <Modal visible={showModal} onDismiss={this.hideModal} dismissable={false}>
          
          <EditRestaurantForm 
             item={pressedItem}
             clearForm={!dialog.errorFlag}
             onEdit={this.handleEdit}
             onCancel={this.hideModal}
           />
          </Modal>
        </Portal>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  dialog: state.dialog,
});

export default connect(mapStateToProps)(RestaurantsCountScreen);

RestaurantsCountScreen.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  dialog: PropTypes.instanceOf(Object).isRequired,
};
