import React from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity, Text,
} from 'react-native';
import {
  Card,
  Divider,
  Title,
  Paragraph,
  Portal,
  Modal,
  TextInput,
  Button,
  List,
  Switch,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';

import { editDetails } from '../actions/profile';
import { closeErrDialog } from '../actions/dialog';
import ErrorDialog from '../components/ErrorDialog';

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F6',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  divider: {
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 2,
  },
  editDetailBtnTouch: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    position: 'relative',
    left: 300,
    top: 20,
  },
  editDetailBtn: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  portal: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    marginBottom: 5,
  },
  button: {
    marginBottom: 5,
  },
});

class ProfileDetailsScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'profileDetailTab',
    tabBarLabel: 'Detail',
  };

  state = {
    editModalVisible: false,
    userFirstName: '',
    userLastName: '',
    useFbAvatar: false,
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  handleEditUserDetails = (userId, profileId) => {
    const { userFirstName, userLastName } = this.state;
    const { editUserDetails } = this.props;
    const data = {
      first_name: userFirstName,
      last_name: userLastName,
    };

    editUserDetails(data, userId, profileId);
    this.hideModal();
  };

  hideModal = () => this.setState({ editModalVisible: false });

  render() {
    const { user, dialog, screenProps } = this.props;
    const {
      editModalVisible, userFirstName, userLastName, useFbAvatar,
    } = this.state;
    console.log(screenProps.test);
    const firstName = user && Object.keys(user).length !== 0 ? user.profile.first_name : '';
    const lastName = user && Object.keys(user).length !== 0 ? user.profile.last_name : '';
    const profileId = user && Object.keys(user).length !== 0 ? user.profile.id : '';
    const userId = user && Object.keys(user).length !== 0 ? user.id : '';
    const userHasFb = user && Object.keys(user).length !== 0 ? user.facebook_auth : null;

    return (
      <ScrollView>
        <Card elevation={30} style={styles.card}>
          <Card.Title
            title="User Details"
            right={props => (
              <Icon
                name="edit"
                size={25}
                color="#900"
                onPress={() => this.setState({
                  editModalVisible: true,
                  userFirstName: firstName,
                  userLastName: lastName,
                })
                }
              />
            )}
          />
          {/* <TouchableOpacity
            style={styles.editDetailBtnTouch}
            onPress={() => this.setState({
              editModalVisible: true,
              userFirstName: firstName,
              userLastName: lastName,
            })
            }
          >
            <View style={styles.editDetailBtn}>

              <Text>
                <Icon name="edit" size={25} color="#900" />
              </Text>
            </View>
          </TouchableOpacity> */}

          <Card.Content style={styles.content}>
            <Text>First Name</Text>
            <Paragraph>{firstName}</Paragraph>
            <Divider style={styles.divider} inset />
            <Text>Last Name</Text>
            <Paragraph>{lastName}</Paragraph>
            <Divider style={styles.divider} inset />
            <Text>Email</Text>
            <Paragraph>{user.email}</Paragraph>
            <Divider style={styles.divider} inset />
          </Card.Content>
        </Card>
        <Card elevation={30} style={styles.card}>
          <Card.Title title="User Settings" />

          <Card.Content style={styles.content}>
            {userHasFb && (
              <List.Item
                title="Use facebook avatar"
                right={props => (
                  <Switch
                    value={useFbAvatar}
                    onValueChange={() => {
                      this.setState({ useFbAvatar: !useFbAvatar });
                      screenProps.fbAvatar(!useFbAvatar);
                    }}
                  />
                )}
              />
            )}
          </Card.Content>
        </Card>
        <Portal>
          <Modal
            contentContainerStyle={styles.portal}
            visible={editModalVisible}
            onDismiss={this.hideModal}
            dismissable={false}
          >
            <TextInput
              style={styles.input}
              mode="flat"
              label="First Name"
              value={userFirstName}
              onChangeText={userFirstName => this.setState({ userFirstName })}
            />

            <TextInput
              style={styles.input}
              mode="flat"
              label="Last Name"
              value={userLastName}
              onChangeText={userLastName => this.setState({ userLastName })}
            />

            <Button
              style={styles.button}
              mode="contained"
              onPress={() => this.handleEditUserDetails(userId, profileId)}
            >
              Update
            </Button>
            <Button style={styles.button} mode="contained" onPress={this.hideModal}>
              Cancel
            </Button>
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
  user: state.user.data,
  dialog: state.dialog,
});

const mapDispatchToProps = dispatch => ({
  editUserDetails: (data, userId, id) => dispatch(editDetails(data, userId, id)),
  errDialog: () => dispatch(closeErrDialog()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDetailsScreen);

ProfileDetailsScreen.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  editUserDetails: PropTypes.func.isRequired,
  dialog: PropTypes.instanceOf(Object).isRequired,
};
