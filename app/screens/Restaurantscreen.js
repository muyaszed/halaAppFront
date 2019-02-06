import React, { Component } from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';

class RestaurantScreen extends Component {
    render() {
        const { PressedItem } = this.props.navigation.state.params
        return (
            <View>
                <Text testID="restaurantDesc">
                    {PressedItem.desc}
                </Text>
            </View>
        )
    }
}

export default RestaurantScreen;