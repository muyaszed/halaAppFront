import React from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import LaunchNavigator from 'react-native-launch-navigator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class MapScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'mapTab',
  };

  render() {
    const { navigation, singleRestaurant } = this.props;
    let restaurant = navigation.getParam('PressedItem');
    if (Object.keys(restaurant).length === 0) {
      restaurant = singleRestaurant.singleData;
    }
    const { height, width } = Dimensions.get('window');
    const LATITUDE = restaurant.latitude; // Korea Town, New York, NY 10001
    const LONGITUDE = restaurant.longitude; // Korea Town, New York, NY 10001
    const LATITUDE_DELTA = 0.008;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
    return (
      <View style={styles.container}>
        <Text>This is Map</Text>
        {/* <MapView style={styles.map} provider={PROVIDER_GOOGLE} /> */}
        <MapView
          style={styles.map}
          onRegionChangeComplete={() => this.currentMarker.showCallout()}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <MapView.Marker
            onPress={() => {
              this.currentMarker.showCallout();
            }}
            ref={(marker) => {
              this.currentMarker = marker;
            }}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
          >
            <MapView.Callout
              onPress={() => {
                let app = null;

                if (LaunchNavigator.isAppAvailable(LaunchNavigator.APP.GOOGLE_MAPS)) {
                  app = LaunchNavigator.APP.GOOGLE_MAPS;
                } else {
                  console.warn('Waze not available - falling back to default navigation app');
                }
                LaunchNavigator.navigate([restaurant.latitude, restaurant.longitude], {
                  app,
                })
                  .then(() => console.log('Launched navigator'))
                  .catch(err => console.error(`Error launching navigator: ${err}`));
              }}
            >
              <View>
                <Text>Click here to open with Google Map</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  singleRestaurant: state.restaurants,
});

export default connect(mapStateToProps)(MapScreen);

MapScreen.propTypes = {
  singleRestaurant: PropTypes.instanceOf(Object).isRequired,
};
