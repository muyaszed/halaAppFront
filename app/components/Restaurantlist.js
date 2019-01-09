import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import RestaurantItem from './Restaurantitem';

export default class RestaurantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this.setState({
            data: [
                {key: '1',
                 name: 'Sushi Toyyiba',
                 location: 'Johor Bahru',
                 category: 'Japanese' 
                },
                {key: '2',
                name: 'Nasi Lemak Mak Timah',
                location: 'Ampang',
                category: 'Malaysian'
                },
                {key: '3',
                name: 'Burgermbira',
                location: 'Melaka',
                category: 'Western'
                },
                {key: '4',
                name: 'Ikan Bakar rebus',
                location: 'Shah Alam',
                category: 'Malaysian'
                },
               
            ]
        })
    }
    render () {
        return (
            <View style={styles.container}>
            <FlatList
              testID="restaurantList"
              data={this.state.data}
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