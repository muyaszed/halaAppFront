import React, { Component } from 'react';
import {
  View, StyleSheet, AsyncStorage, Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import {
  Button, Dialog, Portal, TextInput, HelperText,
} from 'react-native-paper';
import Config from 'react-native-config';

import { getRestaurants, showRestaurant } from '../actions/restaurant';
import { putUser } from '../actions/user';
import { filterByDistance, filterByLatest } from '../actions/filterRestaurant';
import { closeErrDialog } from '../actions/dialog';
import RestaurantList from '../components/Restaurantlist';
import ErrorDialog from '../components/ErrorDialog';
import ListFilter from '../components/ListFilter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1E2E1',
  },
});

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HalalApp',
    tabBarTestID: 'homeTab',
    headerStyle: {
      backgroundColor: '#009165',
    },
  };

  state = {
    askPassword: false,
    password: '',
    passwordRepeat: '',
    comparePassword: false,
    user: null,
  };

  componentDidMount() {
    this.onScreenLoad();
  }

  handleItem = (id) => {
    const { navigation, showRestaurantDetail } = this.props;
    showRestaurantDetail(id);
    setTimeout(() => {
      navigation.navigate('Item');
    }, 400);
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  handleStatus = (status) => {
    this.getList(status);
  };

  getList = (status = 'distance') => {
    const { getData } = this.props;
    getData();
    setTimeout(() => this.filterList(status), 1200);
  };

  filterList = (status) => {
    const { restaurants, filterDataByDistance, filterDataByLatest } = this.props;
    if (status === 'distance') {
      
      filterDataByDistance(restaurants.data);
    }

    if (status === 'latest') {
      
      filterDataByLatest(restaurants.data);
    }
  };

  checkUserPassword = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('currentUser'));
    this.setState({ user });
    
    
    if (!user.password_digest) {
      this.setState({
        askPassword: true,
      });
    }
  };

  onScreenLoad = () => {
    this.checkUserPassword();
    this.getList();
  };

  handleUpdatePassword = () => {
    const { password, user } = this.state;
    const { updateUserPassword } = this.props;
    const data = {
      password,
    };
    updateUserPassword(data, user.id);
    this.setState({ askPassword: false });
  }

  render() {
    const { restaurants, dialog, list } = this.props;
    const {
      askPassword, password, passwordRepeat, comparePassword, user,
    } = this.state;

    
    return (
      <View testID="homeScreen" style={styles.container}>
        <NavigationEvents onDidFocus={() => this.onScreenLoad()} />
        <ListFilter handleStatus={this.handleStatus} />
        <RestaurantList data={list.filteredData} pressItem={this.handleItem} />
        <ErrorDialog
          errMessage={dialog.error}
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />
        {
          <Portal>
            <Dialog
              visible={askPassword}
              dismissable={!askPassword}
              onDismiss={() => this.setState({ askPassword: false })}
            >
              <Dialog.Content>
                <Text>
                  {`${
                    user
                      ? `Attention! ${user.profile.first_name ? user.profile.first_name : 'User'}`
                      : 'Hello User'
                  }, 
We notice that you have not setup your authentication password. It is  advisable to do it so right now.
Thank you

`}
                </Text>
                <TextInput
                  mode="outlined"
                  testID="passwordInput"
                  label="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={passwordInput => this.setState({ password: passwordInput })}
                />
                <TextInput
                  mode="outlined"
                  testID="passwordRepeatInput"
                  label="Confirm Password"
                  secureTextEntry
                  value={passwordRepeat}
                  onChangeText={passwordInput => this.setState({
                    passwordRepeat: passwordInput,
                    comparePassword: !(password === passwordInput),
                  })
                  }
                />
                <HelperText type="error" visible={comparePassword}>
                  Password is not equal. Please type in again.
                </HelperText>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => this.setState({ askPassword: false })}>Cancel</Button>
                <Button onPress={() => this.handleUpdatePassword()}>Update</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        }
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getRestaurants()),
  errDialog: () => {
    dispatch(closeErrDialog());
  },
  showRestaurantDetail: restaurantId => dispatch(showRestaurant(restaurantId)),
  filterDataByDistance: list => dispatch(filterByDistance(list)),
  filterDataByLatest: list => dispatch(filterByLatest(list)),
  updateUserPassword: (data, id) => dispatch(putUser(data, id)),
});

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  dialog: state.dialog,
  list: state.filteredList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

HomeScreen.propTypes = {
  getData: PropTypes.func.isRequired,
  restaurants: PropTypes.instanceOf(Object).isRequired,
  list: PropTypes.instanceOf(Object).isRequired,
  dialog: PropTypes.instanceOf(Object).isRequired,
  showRestaurantDetail: PropTypes.func.isRequired,
  filterDataByDistance: PropTypes.func.isRequired,
  filterDataByLatest: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired,
};
