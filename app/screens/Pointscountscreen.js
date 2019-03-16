import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: '#009165',
  },
});

class PointsCountScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    console.log(screenProps);
    return {
      tabBarLabel: screenProps.reviewsQty.toString(),
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.wrapper}>
          <Avatar.Icon size={57} icon="videogame-asset" color="#009165" style={styles.avatar} />
        </View>
      ),
    };
  };

  render() {
    return <View style={styles.container} />;
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default connect(mapStateToProps)(PointsCountScreen);

PointsCountScreen.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};
