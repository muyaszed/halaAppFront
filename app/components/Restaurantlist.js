import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import RestaurantItem from './Restaurantitem';

export default class RestaurantList extends Component {
    
   

    render () {

        const { data } = this.props;
        return (
            <View style={styles.container}>
            <FlatList
              testID="restaurantList"
              data={data}
              keyExtractor={(item, index) => item.key}
              renderItem={
                  ({item, index}) => 
                <RestaurantItem item={item} index={index}/>
              }
            />
          </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })