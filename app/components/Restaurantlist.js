import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import RestaurantItem from './Restaurantitem';

export default class RestaurantList extends Component {
    
    handlePressItem = (item) => {
      this.props.pressItem(item);
    }

    render () {

        const { data } = this.props;
        return (
            <View style={styles.container}>
            <FlatList
              testID="restaurantList"
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={
                  ({item}) => 
                    
                      <RestaurantItem item={item} pressItem={this.handlePressItem}/>
                    
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