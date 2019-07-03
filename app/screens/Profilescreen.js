import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button as NativeButton,
} from 'react-native';
import {
  Avatar, Button, Portal, Dialog,
} from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import { LoginManager } from 'react-native-fbsdk';

import { unAuthUser } from '../actions/authentication';
import { getUser } from '../actions/user';
import { editAvatar } from '../actions/profile';
import ProfileDetailScreen from './ProfileDetailsScreen';
import ProfileStatsScreen from './ProfileStatsScreen';
import { closeErrDialog } from '../actions/dialog';
import ErrorDialog from '../components/ErrorDialog';
import { imageToFormData } from '../config/helpers';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundAvatar: {
    height: 250,
    backgroundColor: '#21c393',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBackLayer: {
    width: 220,
    height: 220,
    borderRadius: 220 / 2,
    backgroundColor: 'black',
    position: 'relative',
    top: 10,
  },
  avatar: {
    marginTop: -212,
    position: 'relative',
    top: 10,
  },
  editAvatarBtnTouch: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    position: 'relative',
    left: 80,
    bottom: 15,
  },
  editAvatarBtn: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ProfileNavigator = createMaterialTopTabNavigator(
  {
    Profile: ProfileDetailScreen,
    ProfileStats: ProfileStatsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'black',
      indicatorStyle: {
        backgroundColor: '#009165',
      },
      tabStyle: {
        backgroundColor: '#66f7c3',
      },
      style: {
        backgroundColor: '#21c393',
      },
    },
  },
);

class ProfileScreen extends Component {
  static router = ProfileNavigator.router;

  static navigationOptions = {
    tabBarTestID: 'profileTab',
    title: 'Your Profile',
    headerStyle: {
      backgroundColor: '#009165',
    },
  };

  state = {
    avatarLoading: false,
    useFbAvatar: false,
  };

  async componentDidMount() {
    const { getUserInfo } = this.props;
    const user = await AsyncStorage.getItem('currentUser');
    
    if (user) {
      const userId = JSON.parse(user).id || JSON.parse(user).user_id;
      getUserInfo(userId);
    }
    
  }

  handlePress = async () => {
    const { unAuth } = this.props;
    LoginManager.logOut();
    unAuth();
  };

  handleEditAvatar = (userId, id) => {
   
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      console.log(id);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const avatar = imageToFormData('avatar', response);
        const { editUserAvatar } = this.props;
        this.setState({ avatarLoading: true });
        editUserAvatar(avatar, userId, id).then(() => {
          this.setState({ avatarLoading: false });
        });
      }
    });
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  hideAvatarLoading = () => this.setState({ avatarLoading: false });

  fbAvatar = (status) => {
    console.log(status);
    this.setState({ useFbAvatar: status });
  }

  render() {
    const { navigation, user, dialog } = this.props;
    const { avatarLoading, useFbAvatar } = this.state;
    const avatar = user && Object.keys(user).length !== 0 ? user.profile.avatar_uri : '';
    const avatarUri = avatar || 'https://robohash.org/cafe?set=set1';
    const profileId = user && Object.keys(user).length !== 0 ? user.profile.id : '';
    const userId = user && Object.keys(user).length !== 0 ? user.id : '';
    const fbAvatar = user && Object.keys(user).length !== 0 ? user.facebook_auth.fb_avatar : null;

    return (
      <View testID="profileScreen" style={styles.container}>
        <Portal>
          <Dialog
            visible={avatarLoading}
            onDismiss={this.hideAvatarLoading}
            style={{ backgroundColor: 'transparent' }}
          >
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ backgroundColor: 'transparent' }}
            />
          </Dialog>
        </Portal>

        <ErrorDialog
          errMessage="Sorry, there is a problem uploading your avatar. Please try again later."
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />
        <View style={styles.backgroundAvatar}>
          <View style={styles.avatarBackLayer} />
          <Avatar.Image style={styles.avatar} size={204} source={{ uri: useFbAvatar ? fbAvatar : avatarUri }} />
          <TouchableOpacity
            onPress={() => this.handleEditAvatar(userId, profileId)}
            style={styles.editAvatarBtnTouch}
          >
            <View style={styles.editAvatarBtn}>
              <Text>
                <Icon name="edit" size={25} color="#900" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ProfileNavigator screenProps={{test: 'Hello World', fbAvatar: s => this.fbAvatar(s) }} navigation={navigation} />
        <View>
          <Button
            testID="logoutButton"
            icon="exit-to-app"
            mode="outlined"
            onPress={this.handlePress}
          >
            Logout
          </Button>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.data,
  dialog: state.dialog,
});

const mapDispatchToProps = dispatch => ({
  unAuth: () => dispatch(unAuthUser()),
  getUserInfo: id => dispatch(getUser(id)),
  editUserAvatar: (uri, userId, id) => dispatch(editAvatar(uri, userId, id)),
  errDialog: () => {
    dispatch(closeErrDialog());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);

ProfileScreen.propTypes = {
  unAuth: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  editUserAvatar: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  errDialog: PropTypes.func.isRequired,
  dialog: PropTypes.instanceOf(Object).isRequired,
};
