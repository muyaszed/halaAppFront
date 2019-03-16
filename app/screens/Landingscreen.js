import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 0.85,
    alignItems: 'center',
    paddingTop: 50,
  },
  bottom: {
    flex: 0.15,
    backgroundColor: '#009165',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bottomButton: {
    position: 'relative',
    top: 10,
  },
  bottomText: {
    textAlign: 'center',
    position: 'relative',
    top: 25,
  },
});

class LandingScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Icon name="bowl" size={80} color="#21c393" />
          <Title>Welcome to Halalapp</Title>
        </View>
        <View style={styles.bottom}>
          <Button
            style={styles.bottomButton}
            mode="contained"
            onPress={() => navigation.navigate('SignUp')}
          >
            Create Free Account
          </Button>
          <Text style={styles.bottomText}>
            Already have Account?
            <Text onPress={() => navigation.navigate('SignIn')}> Log in</Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default LandingScreen;
