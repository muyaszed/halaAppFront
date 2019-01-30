import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';


class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        // this._bootstrapAsync();
    }

    // _bootstrapAsync = async () => {
    //     const userToken = await AsyncStorage.getItem('userToken');
    //     setTimeout(() => {
    //         this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    //     }, 3000)
        
    // };
    componentDidMount() {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            setTimeout(() => {
                navigation.navigate(userToken ? 'App' : 'Auth');
            }, 1000)
        });
        
      }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })

  const mapStateToProps = state => {
    return {
      auth: state.authentication
    }
  }
  const mapDispatchToProps = (dispatch) => {
      return {
          userToken: () => {
              dispatch(userToken());
          }
      }
  }

  export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen));