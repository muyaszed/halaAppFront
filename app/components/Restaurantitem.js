import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

export default class RestaurantItem extends Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Title testID="restaurantTitle">{this.props.item.name}</Title>
                    <Text>{this.props.item.location}</Text>
                    <Text>{this.props.item.category}</Text>
                </Card.Content>
            </Card>
        );
    }
}

