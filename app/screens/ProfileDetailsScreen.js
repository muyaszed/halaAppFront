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
} from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';

import { editDetails } from '../actions/profile';

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
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
});

class ProfileDetailsScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'rofileDetailTab',
    tabBarLabel: 'Detail',
  };

  state = {
    editModalVisible: false,
    userFirstName: '',
    userLastName: '',
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
    const { user } = this.props;
    const { editModalVisible, userFirstName, userLastName } = this.state;
    console.log(user);
    const firstName = user && Object.keys(user).length !== 0 ? user.profile.first_name : '';
    const lastName = user && Object.keys(user).length !== 0 ? user.profile.last_name : '';
    const profileId = user && Object.keys(user).length !== 0 ? user.profile.id : '';
    const userId = user && Object.keys(user).length !== 0 ? user.id : '';

    return (
      <ScrollView>
        <Card elevation={30} style={styles.card}>
          <TouchableOpacity
            styel={{ width: 35,
            height: 35,
            borderRadius: 35 / 2, 
}} onPress={() => this.setState({ editModalVisible: true, userFirstName: firstName, userLastName: lastName })}>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 35 / 2,
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
                // position: 'relative',
                // left: 320,
                // top: 20,
              }}
            >
              <Text>
                <Icon name="edit" size={25} color="#900" />
              </Text>
            </View>
          </TouchableOpacity>

          <Card.Content style={styles.content}>
            <Title>First Name</Title>
            <Paragraph>{firstName}</Paragraph>
            <Divider style={styles.divider} inset />
            <Title>Last Name</Title>
            <Paragraph>{lastName}</Paragraph>
            <Divider style={styles.divider} inset />
            <Title>Email</Title>
            <Paragraph>{user.email}</Paragraph>
            <Divider style={styles.divider} inset />
          </Card.Content>
        </Card>
        <Portal>
          <Modal visible={editModalVisible} onDismiss={this.hideModal} dismissable={false}>
            <TextInput
              label="First Name"
              multiline
              value={userFirstName}
              onChangeText={userFirstName => this.setState({ userFirstName })}
            />

            <TextInput
              label="Last Name"
              multiline
              value={userLastName}
              onChangeText={userLastName => this.setState({ userLastName })}
            />

            <Button mode="contained" onPress={() => this.handleEditUserDetails(userId, profileId)}>
              Update
            </Button>
            <Button mode="contained" onPress={this.hideModal}>
              Cancel
            </Button>
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
  editUserDetails: (data, userId, id) => dispatch(editDetails(data, userId, id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailsScreen);

ProfileDetailsScreen.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  editUserDetails: PropTypes.func.isRequired,
};
