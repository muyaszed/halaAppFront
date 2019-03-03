import React, { Component } from 'react';
import {
  View, AsyncStorage, Text, TouchableOpacity, StyleSheet, Button as NativeButton
} from 'react-native';
import { Avatar, Button, Portal, Modal } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import { unAuthUser } from '../actions/authentication';
import { getUser } from '../actions/user';
import { editAvatar } from '../actions/profile'; 
import ProfileDetailScreen from './ProfileDetailsScreen';
import ProfileStatsScreen from './ProfileStatsScreen';
// import { updateCurrentUser } from '../config/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundAvatar: {
    height: 300,
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
    top: 20,
  },
  avatar: {
    marginTop: -212, 
    position: 'relative', 
    top: 20,
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
  }
});

const ProfileNavigator = createMaterialTopTabNavigator({
  Profile: ProfileDetailScreen,
  ProfileStats: ProfileStatsScreen,
}, {
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
});

class ProfileScreen extends Component {
  static router = ProfileNavigator.router;

  static navigationOptions = {
    tabBarTestID: 'profileTab',
    title: 'Your Profile',
    headerStyle: {
      backgroundColor: '#009165',
    },
  };



  async componentDidMount() {
    const { getUserInfo } = this.props;
    const user = await AsyncStorage.getItem('currentUser');
    getUserInfo(JSON.parse(user).id);
  }

  handlePress = async () => {
    const { unAuth } = this.props;
    unAuth();
  };

  handleEditAvatar = (userId, id) => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { avatar: response.uri };
        const { editUserAvatar } = this.props;
       
        editUserAvatar(source, userId, id);
  
      }
    });
  };

 

  render() {
    
    const { navigation, user } = this.props;
    const avatar = user && Object.keys(user).length !== 0 ? user.profile.avatar : '';
    const avatarUri = avatar || 'https://robohash.org/cafe?set=set1';
    const profileId = user && Object.keys(user).length !== 0 ? user.profile.id : '';
    const userId = user && Object.keys(user).length !== 0 ? user.id : '';
    
   
    
    return (
      <View testID="profileScreen" style={styles.container}>
        <View
          style={styles.backgroundAvatar}
        >
          <View
            style={styles.avatarBackLayer}
          />
          <Avatar.Image
            style={styles.avatar}
            size={204}
            source={{ uri: avatarUri }}
          />
          <TouchableOpacity 
            onPress={() => this.handleEditAvatar(userId, profileId)}
            style={styles.editAvatarBtnTouch}
          >
            <View
              style={styles.editAvatarBtn}
            >
              <Text>
                <Icon name="edit" size={25} color="#900" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ProfileNavigator navigation={navigation} />
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
});

const mapDispatchToProps = dispatch => ({
  unAuth: () => dispatch(unAuthUser()),
  getUserInfo: id => dispatch(getUser(id)),
  editUserAvatar: (uri, userId, id) => dispatch(editAvatar(uri, userId, id)),
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
};
