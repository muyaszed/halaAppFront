import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
// import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

class AuthLoadingScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setTimeout(() => {
        navigation.navigate(userToken ? 'App' : 'Auth');
      }, 1000);
    });
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default withNavigation(AuthLoadingScreen);

// AuthLoadingScreen.propTypes = {
//   navigation: PropTypes.objectOf(
//     PropTypes.oneOfType([
//       PropTypes.func,
//       PropTypes.string,
//     ])
//   ).isRequired,
// };
