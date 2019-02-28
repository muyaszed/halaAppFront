import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import LaunchNavigator from 'react-native-launch-navigator';
// import { Button } from 'react-native-paper';
// import PropTypes from 'prop-types';
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
    const { navigation } = this.props;
    const restaurant = navigation.getParam('PressedItem');
    return (
      <View style={styles.container}>
        <Text>This is Map</Text>
        {/* <MapView style={styles.map} provider={PROVIDER_GOOGLE} /> */}
        <MapView
          style={styles.map}
          onRegionChangeComplete={() => this.currentMarker.showCallout()}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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

export default MapScreen;
