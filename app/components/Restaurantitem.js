import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

export default class RestaurantItem extends Component {
    render() {
        return (
            <Card elevation={30} style={styles.card}>
                <Card.Content>
                    <Title testID="restaurantTitle">{this.props.item.name}</Title>
                    <Text>{this.props.item.location}</Text>
                    <Text>{this.props.item.category}</Text>
                </Card.Content>
            </Card>
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