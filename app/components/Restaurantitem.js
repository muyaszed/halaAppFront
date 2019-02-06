import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

export default class RestaurantItem extends Component {

    handleOnPress = (item) => {
        this.props.pressItem(item);
    }
    render() {
        return (
           <TouchableOpacity onPress={this.handleOnPress.bind(this, this.props.item)}> 
                
                <Card elevation={30} style={styles.card}>
                    <Card.Content>
                        <Title testID="restaurantTitle">{this.props.item.name}</Title>
                        <Text>{this.props.item.location}</Text>
                        <Text>{this.props.item.category}</Text>
                    </Card.Content>
                </Card>
            
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    }
  });